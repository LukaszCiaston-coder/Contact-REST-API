const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const checkToken = require("./middleware/checkToken");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const path = require("path");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Połączenie z bazą danych MongoDB
console.log("Przed próbą połączenia z bazą danych");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

db.once("open", () => {
  console.log("Database connection successful");
});

// Konfiguracja obsługi plików statycznych z folderu "public"
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
app.use("/api/contacts", checkToken, contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
