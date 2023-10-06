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
  - [7. Rejestracja Użytkownika](#7-rejestracja-użytkownika)
  - [8. Logowanie Użytkownika](#8-logowanie-użytkownika)
  - [9. Wylogowanie Użytkownika](#9-wylogowywanie-użytkownika)
  - [10. Pobierz Obecnie Zalogowanego Użytkownika](#10-pobierz-obecnie-zalogowanego-użytkownika)
  - [11. Aktualizacja avatara użytkownika](#11-aktualizuj-avatar-użytkownika)
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

```json
{
  "bcryptjs": "^2.4.3",
  "cors": "2.8.5",
  "cross-env": "7.0.3",
  "dotenv": "^16.3.1",
  "express": "4.17.1",
  "express-static": "^1.2.6",
  "gravatar": "^1.8.2",
  "jimp": "^0.22.10",
  "joi": "^17.10.2",
  "jsonwebtoken": "^9.0.2",
  "mongo": "^0.1.0",
  "mongoose": "^7.5.3",
  "morgan": "1.10.0",
  "multer": "^1.4.5-lts.1",
  "nanoid": "^3.1.27"
}
```

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
- 200 OK - Jeśli kontakt został znaleziony
- 403 Forbidden - Jeśli użytkownik próbuje uzyskać dostęp do kontaktu, który nie należy do niego
- 404 Not Found - Jeśli kontakt nie został znaleziony lub podano nieprawidłowe ID

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
- 200 OK - Jeśli kontakt został zaktualizowany
- 403 Forbidden - Jeśli użytkownik próbuje uzyskać dostęp do kontaktu, który nie należy do niego
- 404 Not Found - Jeśli kontakt nie został znaleziony lub podano nieprawidłowe ID

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
- 200 OK - Jeśli status kontaktu został zaktualizowany
- 403 Forbidden - Jeśli użytkownik próbuje uzyskać dostęp do kontaktu, który nie należy do niego
- 404 Not Found - Jeśli kontakt nie został znaleziony lub podano nieprawidłowe ID

### 6. Usuń Kontakt

- **Ścieżka:** `/api/contacts/{contactId}`
- **Metoda:** `DELETE`
- **Opis:** Usuń konkretny kontakt na podstawie jego ID.
- **Parametry URL:** `{contactId}` - ID kontaktu
- **Odpowiedź:**
- 200 OK - Jeśli kontakt został usunięty
- 403 Forbidden - Jeśli użytkownik próbuje uzyskać dostęp do kontaktu, który nie należy do niego
- 404 Not Found - Jeśli kontakt nie został znaleziony lub podano nieprawidłowe ID

### 7. Rejestracja Użytkownika

- **Ścieżka:** `/api/users/signup`
- **Metoda:** `POST`
- **Opis:** Zarejestruj nowego użytkownika.
- **Ciało żądania:** JSON z danymi nowego użytkownika
- **Przykładowe ciało żądania:**

```json
{
  "email": "jan.kowalski@example.com",
  "password": "haslo123"
}
```

- **Odpowiedź:** 201 Created
- **Przykładowa odpowiedź:**

```json
{
  "user": {
    "email": "jan.kowalski@example.com",
    "subscription": "starter",
    "avatarURL": "https://www.gravatar.com/avatar/{GRAVATAR_HASH}"
  }
}
```

Po rejestracji użytkownikowi zostaje automatycznie przypisany awatar z Gravatara na podstawie jego adresu e-mail. Avatar ten jest dostępny pod adresem URL:

`https://www.gravatar.com/avatar/{GRAVATAR_HASH}`

Gravatar hash jest generowany na podstawie adresu e-mail użytkownika i jest unikalnym identyfikatorem awatara z Gravatara.

### 8. Logowanie Użytkownika

- **Ścieżka:** `/api/users/login`
- **Metoda:**`POST`
- **Opis:** Zaloguj istniejącego użytkownika.
- **Ciało żądania:** JSON z danymi logowania
- **Przykładowe ciało żądania:**

```json
{
  "email": "jan.kowalski@example.com",
  "password": "haslo123"
}
```

- **Odpowiedź:** 200 OK
- **Przykładowa odpowiedź:**

```json
{
  "token": "tokenJWT",
  "user": {
    "email": "jan.kowalski@example.com",
    "subscription": "starter",
    "avatarURL": "https://www.gravatar.com/avatar/{GRAVATAR_HASH}"
  }
}
```

### 9. Wylogowywanie Użytkownika

- **Ścieżka:** `/api/users/logout`
- **Metoda:** `GET`
- **Opis:** Wyloguj zalogowanego użytkownika.
- **Nagłówek żądania:** Authorization: Bearer {tokenJWT}
- **Odpowiedź:** 204 No Content

### 10. Pobierz Obecnie Zalogowanego Użytkownika

- **Ścieżka:** `/api/users/current`
- **Metoda:** `GET`
- **Opis:** Pobierz informacje o obecnie zalogowanym użytkowniku.
- **Nagłówek żądania:** Authorization: Bearer {tokenJWT}
- **Odpowiedź:** 200 OK
- **Przykładowa odpowiedź:**

```json
{
  "email": "jan.kowalski@example.com",
  "subscription": "starter",
  "avatarURL": "https://www.gravatar.com/avatar/{GRAVATAR_HASH}"
}
```

### 11. Aktualizacja Avatar Użytkownika

Ten endpoint umożliwia użytkownikom zmianę swojego avatara.

- **Ścieżka:** `/api/avatars`
- **Metoda:** `PATCH`
- **Zabezpieczenia:** Wymaga uwierzytelnienia za pomocą tokena JWT (JSON Web Token). Aby uzyskać token, użytkownik musi być zalogowany i przekazać go w nagłówku `Authorization`.

#### Parametry żądania:

- **avatar:** Plik graficzny, który zostanie przypisany jako nowy avatar użytkownika. Plik powinien być przesyłany jako część formularza z polem `avatar`.

#### Przykład żądania:

```h
PATCH /api/avatars
Authorization: Bearer {TOKEN_JWT}
Content-Type: multipart/form-data

Content-Disposition: form-data; name="avatar"; filename="new_avatar.jpg"
Content-Type: image/jpeg

```

{TOKEN_JWT} - Token JWT użytkownika, który jest wymagany do uwierzytelnienia żądania.

- **Odpowiedzi:**

  - 200 OK: Avatar został zaktualizowany pomyślnie. Odpowiedź zawiera URL nowego avatara.

- **Przykładowa odpowiedź:**

```json
{
  "avatarURL": "/avatars/{UNIQUE_FILENAME}.jpg"
}
```

- 400 Bad Request: Brak załączonego pliku graficznego w żądaniu. Odpowiedź zawiera wiadomość: "No file uploaded".

- 401 Unauthorized: Użytkownik nie jest uwierzytelniony lub token JWT jest nieprawidłowy. Odpowiedź zawiera wiadomość: "Not authorized".

- 500 Internal Server Error: Występuje, gdy wystąpią błędy wewnętrzne serwera podczas przetwarzania żądania.

- **Uwagi:**
- Aby zaktualizować avatar, użytkownik musi być uwierzytelniony i dostarczyć poprawny token JWT w nagłówku Authorization.

- Jeśli użytkownik ma już przypisany avatar, to stary plik zostanie usunięty z serwera.

- Nowy avatar zostanie przeskalowany do rozmiaru 250x250 pikseli i skonwertowany na format JPEG z jakością 60%.

- Plik avataru jest dostępny publicznie pod adresem URL /avatars/{UNIQUE_FILENAME}.jpg. Możesz użyć tego URL do wyświetlenia avatara na stronie profilu użytkownika.

## Obsługa Błędów

- W przypadku błędów walidacji danych, API zwraca odpowiedź HTTP 400 Bad Request wraz z odpowiednią wiadomością.
- W przypadku błędów związanych z brakiem kontaktu, API zwraca odpowiedź HTTP 404 Not Found.

## Autor

Ten projekt został stworzony przez `[Łukasza Ciastonia]`.
