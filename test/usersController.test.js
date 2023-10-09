const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

describe("Authentication Controller", () => {
  let user;
  let token;

  beforeAll(async () => {
    // Usuń użytkownika "test@example.com" z bazy danych, jeśli istnieje
    await User.deleteOne({ email: "test1@example.com" });

    // Dodaj przykładowego użytkownika do bazy danych przed testami
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("testpassword", salt);
    user = await User.create({
      email: "test1@example.com",
      password: hashedPassword,
    });

    // Generuj token JWT po utworzeniu użytkownika
    token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
  });

  afterAll(async () => {
    // Usuń przykładowego użytkownika po testach
    await User.deleteMany();
  });
  it("should sign up a user", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({ email: "newuser1@example.com", password: "newpassword" });

    // Sprawdź, czy status odpowiedzi wynosi 201 (Created)
    expect(response.status).toBe(201);

    // Sprawdź, czy odpowiedź zawiera token
    expect(response.body).toHaveProperty("token");

    // Sprawdź, czy odpowiedź zawiera obiekt użytkownika z polem "email"
    expect(response.body.user).toHaveProperty("email");
    expect(typeof response.body.user.email).toBe("string");

    // Sprawdź, czy odpowiedź zawiera obiekt użytkownika z polem "subscription"
    expect(response.body.user).toHaveProperty("subscription");
    expect(typeof response.body.user.subscription).toBe("string");
  });

  it("should return an error for existing user during sign up", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({ email: "test1@example.com", password: "testpassword" });

    // Sprawdź, czy status odpowiedzi wynosi 409 (Conflict)
    expect(response.status).toBe(409);

    // Sprawdź, czy odpowiedź zawiera wiadomość o błędzie
    expect(response.body).toHaveProperty("message", "Email in use");
  });

  it("should sign in a user", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test1@example.com", password: "testpassword" });

    // Sprawdź, czy status odpowiedzi wynosi 200
    expect(response.status).toBe(200);

    // Sprawdź, czy odpowiedź zawiera token
    expect(response.body).toHaveProperty("token");

    // Sprawdź, czy odpowiedź zawiera obiekt użytkownika z polem "email"
    expect(response.body.user).toHaveProperty("email");
    expect(typeof response.body.user.email).toBe("string");

    // Sprawdź, czy odpowiedź zawiera obiekt użytkownika z polem "subscription"
    expect(response.body.user).toHaveProperty("subscription");
    expect(typeof response.body.user.subscription).toBe("string");
  });

  it("should return an error for incorrect sign in", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test1@example.com", password: "incorrectpassword" });

    // Sprawdź, czy status odpowiedzi wynosi 401 (Unauthorized)
    expect(response.status).toBe(401);

    // Sprawdź, czy odpowiedź zawiera wiadomość o błędzie
    expect(response.body).toHaveProperty(
      "message",
      "Email or password is wrong"
    );
  });

  it("should get the current user", async () => {
    const response = await request(app)
      .get("/api/users/current")
      .set("Authorization", `Bearer ${token}`);

    // Sprawdź, czy status odpowiedzi wynosi 200
    expect(response.status).toBe(200);

    // Sprawdź, czy odpowiedź zawiera obiekt użytkownika z polem "email"
    expect(response.body).toHaveProperty("email");
    expect(typeof response.body.email).toBe("string");

    // Sprawdź, czy odpowiedź zawiera obiekt użytkownika z polem "subscription"
    expect(response.body).toHaveProperty("subscription");
    expect(typeof response.body.subscription).toBe("string");
  });

  it("should log out a user", async () => {
    const response = await request(app)
      .get("/api/users/logout")
      .set("Authorization", `Bearer ${token}`);

    // Sprawdź, czy status odpowiedzi wynosi 204 (No Content)
    expect(response.status).toBe(204);

    // Sprawdź, czy użytkownik ma pusty token w bazie danych
    const updatedUser = await User.findById(user._id);
    expect(updatedUser.token).toBeNull();
  });
});
