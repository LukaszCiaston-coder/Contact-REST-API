# Dokumentacja API Książki Adresowej

## Spis treści

- [Opis projektu](#opis-projektu)
- [Pierwsze kroki](#pierwsze-kroki)
  - [Baza URL](#baza-url)
  - [Wymagane Biblioteki](#wymagane-biblioteki)
- [Endpointy](#endpointy)
  - [1. Lista Kontaktów](#1-lista-kontaktów)
  - [2. Pobierz Kontakt wg ID](#2-pobierz-kontakt-wg-id)
  - [3. Dodaj Nowy Kontakt](#3-dodaj-nowy-kontakt)
  - [4. Aktualizuj Kontakt](#4-aktualizuj-kontakt)
  - [5. Aktualizuj Status Ulubionego](#5-aktualizuj-status-ulubionego)
  - [6. Usuń Kontakt](#6-usuń-kontakt)
- [Obsługa Błędów](#obsługa-błędów)
- [Autor](#autor)

## Opis projektu

Projekt "Książka Adresowa" to proste API służące do zarządzania kontaktami. Pozwala na wykonywanie operacji CRUD (Create, Read, Update, Delete) na kontaktach przechowywanych w książce adresowej. To API udostępnia endpointy do wyświetlania listy kontaktów, pobierania konkretnych kontaktów, dodawania nowych kontaktów, aktualizacji istniejących kontaktów, aktualizacji statusu ulubionego kontaktu i usuwania kontaktów.

## Pierwsze kroki

Aby korzystać z API "Książka Adresowa", wykonaj poniższe kroki, aby skonfigurować środowisko i zrozumieć dostępne endpointy.

### Baza URL

Baza URL dla wszystkich endpointów API jest zdefiniowana w pliku konfiguracyjnym (np. `.env`) jako zmienna `MONGODB_URI`. To URL jest używane do połączenia z bazą danych MongoDB.

### Wymagane Biblioteki

Przed rozpoczęciem korzystania z tego API, upewnij się, że zainstalowane są następujące biblioteki i zależności:

- [Node.js](https://nodejs.org/) - Środowisko uruchomieniowe JavaScript.
- [MongoDB](https://www.mongodb.com/) - Baza danych NoSQL używana przez projekt.
- morgan, cors, dotenv, express, joj, mongo, mongoose, nodemon.

Aby zainstalować zależności projektu, użyj polecenia:

```bash
npm install
```

## Endpointy

### 1. Lista Kontaktów

- **Ścieżka:** `/api/contacts`
- **Metoda:** `GET`
- **Opis:** Pobierz listę wszystkich kontaktów znajdujących się w książce adresowej.
- **Odpowiedź:** 200 OK
- **Przykładowa odpowiedź:**

  ```json
  [
    {
      "_id": "60e4d52574e786001c0b992d",
      "name": "Jan Kowalski",
      "email": "jan.kowalski@example.com",
      "phone": "+123456789",
      "favorite": true
    }
    // więcej kontaktów...
  ]
  ```

### 2. Pobierz Kontakt wg ID

- **Ścieżka:** `/api/contacts/{contactId}`
- **Metoda:** `GET`
- **Opis:** Pobierz szczegóły konkretnego kontaktu na podstawie jego ID.
- **Parametry URL:** {contactId} - ID kontaktu
- **Odpowiedź:**
  200 OK - Jeśli kontakt został znaleziony
  404 Not Found - Jeśli kontakt nie został znaleziony lub podano nieprawidłowe ID

### 3. Dodaj Nowy Kontakt

- **Ścieżka:** `/api/contacts`
- **Metoda:** `POST`
- **Opis:** Dodaj nowy kontakt do książki adresowej.
- **Ciało żądania:** JSON z danymi kontaktu
- **Przykładowe ciało żądania:**

```json
[
  {
    "name": "Anna Nowak",
    "email": "anna.nowak@example.com",
    "phone": "+987654321"
  }
]
```

- **Odpowiedź:** 201 Created
- **Przykładowa odpowiedź:**

```json
[
  {
    "_id": "60e4d52574e786001c0b992e",
    "name": "Anna Nowak",
    "email": "anna.nowak@example.com",
    "phone": "+987654321",
    "favorite": false
  }
]
```

### 4. Aktualizuj Kontakt

- **Ścieżka:** `/api/contacts/{contactId}`
- **Metoda:** `PUT`
- **Opis:** Zaktualizuj dane konkretnego kontaktu na podstawie jego ID.
- **Parametry URL:** `{contactId}` - ID kontaktu
- **Ciało żądania:** JSON z zaktualizowanymi danymi kontaktu
- **Przykładowe ciało żądania:**

```json
[
  {
    "name": "Maria Kowalska",
    "email": "maria.kowalska@example.com",
    "phone": "987-654-321",
    "favorite": true
  }
]
```

- **Odpowiedź:**
  200 OK - Jeśli kontakt został zaktualizowany
  404 Not Found - Jeśli kontakt nie został znaleziony lub podano nieprawidłowe ID

### 5. Aktualizuj Status Ulubionego

- **Ścieżka:** `/api/contacts/{contactId}/favorite`
- **Metoda:** `PATCH`
- **Opis:** Zaktualizuj status ulubionego kontaktu na podstawie jego ID.
- **Parametry URL:** `{contactId}` - ID kontaktu
- **Ciało żądania:** JSON z polem favorite
- **Przykładowe ciało żądania:**

```json
[
  {
    "favorite": true
  }
]
```

- **Odpowiedź:**
  200 OK - Jeśli status kontaktu został zaktualizowany
  404 Not Found - Jeśli kontakt nie został znaleziony lub podano nieprawidłowe ID

### 6. Usuń Kontakt

- **Ścieżka:** `/api/contacts/{contactId}`
- **Metoda:** `DELETE`
- **Opis:** Usuń konkretny kontakt na podstawie jego ID.
- **Parametry URL:** `{contactId}` - ID kontaktu
- **Odpowiedź:**
  200 OK - Jeśli kontakt został usunięty
  404 Not Found - Jeśli kontakt nie został znaleziony lub podano nieprawidłowe ID

## Obsługa Błędów

W przypadku błędów walidacji danych, API zwraca odpowiedź HTTP 400 Bad Request wraz z odpowiednią wiadomością.
W przypadku błędów związanych z brakiem kontaktu, API zwraca odpowiedź HTTP 404 Not Found.

## Autor

Ten projekt został stworzony przez [Łukasza Ciastonia].
