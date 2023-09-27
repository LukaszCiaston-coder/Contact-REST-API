# Contacts Book API Documentation

## Table of Contents

- [Project Description](#project-description)
- [Getting Started](#getting-started)
  - [Base URL](#base-url)
  - [Required Libraries](#required-libraries)
- [Endpoints](#endpoints)
  - [1. List Contacts](#1-list-contacts)
  - [2. Get Contact by ID](#2-get-contact-by-id)
  - [3. Add New Contact](#3-add-new-contact)
  - [4. Update Contact](#4-update-contact)
  - [5. Update Favorite Status](#5-update-favorite-status)
  - [6. Delete Contact](#6-delete-contact)
- [Error Handling](#error-handling)
- [Author](#author)

## Project Description

The "Contacts Book" project is a simple API service for managing contacts. It allows you to perform CRUD (Create, Read, Update, Delete) operations on contacts stored in an address book. This API provides endpoints to list contacts, retrieve specific contacts, add new contacts, update existing contacts, update the favorite status of contacts, and delete contacts.

## Getting Started

To use the "Contacts Book" API, follow the instructions below to set up your environment and understand the available endpoints.

### Base URL

The base URL for all API endpoints is defined in your configuration file (e.g., `.env`) as the `MONGODB_URI` variable. This URL is used to connect to the MongoDB database.

### Required Libraries

Before you start using this API, make sure the following libraries and dependencies are installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [MongoDB](https://www.mongodb.com/) - NoSQL database used by the project.
- morgan, cors, dotenv, express, joj, mongo, mongoose, nodemon.

To install project dependencies, use the following command:

````bash
npm install


## Endpoints

### 1. List Contacts

- **Path:** `/api/contacts`
- **Method:** `GET`
- **Description:** Get a list of all contacts in the address book.
- **Response:** 200 OK
- **Example Response:**

  ```json
  [
    {
      "_id": "60e4d52574e786001c0b992d",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+123456789",
      "favorite": true
    }
    // more contacts...
  ]
````

### 2. Get Contact by ID

- **Path:** `/api/contacts/{contactId}`
- **Method:** `GET`
- **Description:** Get details of a specific contact based on its ID.
- **URL Parameters:** `{contactId} - Contact ID`
- **Response:**
  200 OK - If the contact is found
  404 Not Found - If the contact is not found or an invalid ID is provided

### 3. Add New Contact

- **Path:** `/api/contacts`
- **Method:** `POST`
- **Description:** Add a new contact to the address book.
- **Request Body:** JSON with contact data
- **Example Request Body:**

```json
[
  {
    "name": "Lukasz Ciaston",
    "email": "lukasz.ciaston@example.com",
    "phone": "+987654321"
  }
]
```

- **Response:** `201 Created`

- **Example Response:**

```json
[
  {
    "_id": "60e4d52574e786001c0b992e",
    "name": "Lukasz Ciaston",
    "email": "lukasz.ciaston@example.com",
    "phone": "+987654321",
    "favorite": false
  }
]
```

### 4. Update Contact

- **Path:** `/api/contacts/{contactId}`
- **Method:** `PUT`
- **Description:** Update the data of a specific contact based on its ID.
- **URL Parameters:** `{contactId} - Contact ID`
- **Request Body:** JSON with updated contact data
- **Example Request Body:**

```json
[
  {
    "name": "Jan Kowalski",
    "email": "jan.kowalski@example.com",
    "phone": "987-654-321",
    "favorite": true
  }
]
```

- **Response:**
  200 OK - If the contact is updated
  404 Not Found - If the contact is not found or an invalid ID is provided

### 5. Update Favorite Status

- **Path:** `/api/contacts/{contactId}/favorite`
- **Method:** `PATCH`
- **Description:** Update the favorite status of a contact based on its ID.
- **URL Parameters:** `{contactId} - Contact ID`
- **Request Body:** JSON with the favorite field
- **Example Request Body:**

```json
[
  {
    "favorite": true
  }
]
```

- **Response:**
  200 OK - If the contact's status is updated
  404 Not Found - If the contact is not found or an invalid ID is provided

### 6. Delete Contact

- **Path:** `/api/contacts/{contactId}`
- **Method:** `DELETE`
- **Description:** Delete a specific contact based on its ID.`
- **URL Parameters:** `{contactId} - Contact ID`
- **Response:**
  200 OK - If the contact is deleted
  404 Not Found - If the contact is not found or an invalid ID is provided

## Error Handling

In case of data validation errors, the API returns an HTTP 400 Bad Request along with an appropriate message.
In case of errors related to contact not found, the API returns an HTTP 404 Not Found response.

## Author

This project was created by [Łukasz Ciastoń].
