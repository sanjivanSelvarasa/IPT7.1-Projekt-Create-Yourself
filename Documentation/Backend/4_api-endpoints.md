# API-Endpunkte

## Server (Port 3000)

---

### [POST] /users/register

**Beschreibung:**  
Registriert einen neuen Benutzer.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully."
}
```

**Fehler-Response:**
```json
{
  "error": "string"
}
```

Statuscodes:
- `201` Benutzer erfolgreich registriert
- `400` Ungültige oder fehlende E-Mail / Passwort
- `409` E-Mail bereits registriert

---

### [POST] /users/login

**Beschreibung:**  
Meldet einen bestehenden Benutzer an. Gibt einen kurzlebigen Access Token (15 min) und einen Refresh Token zurück.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

Statuscodes:
- `200` Login erfolgreich
- `400` Ungültige oder fehlende E-Mail / Passwort
- `401` Ungültige E-Mail oder falsches Passwort

---

### [DELETE] /users/logout

**Beschreibung:**  
Meldet den Benutzer ab, indem der Refresh Token serverseitig invalidiert wird.

**Request Body:**
```json
{
  "token": "string"
}
```

**Response:** `204 No Content`

Statuscodes:
- `204` Erfolgreich abgemeldet
- `400` Token fehlt oder ist kein String

---

### [POST] /token

**Beschreibung:**  
Stellt einen neuen Access Token aus, wenn ein gültiger Refresh Token übergeben wird.

**Request Body:**
```json
{
  "token": "string"
}
```

**Response (200):**
```json
{
  "accessToken": "string"
}
```

Statuscodes:
- `200` Neuer Access Token ausgestellt
- `400` Token fehlt oder ist ungültig
- `403` Refresh Token abgelaufen, ungültig oder widerrufen

---

### [GET] /users

**Beschreibung:**  
Gibt eine Liste aller registrierten E-Mail-Adressen zurück (Entwicklungs-/Debug-Endpunkt).

**Response (200):**
```json
["email1@example.com", "email2@example.com"]
```

Statuscodes:
- `200` Erfolgreich

---

## Portfolio Core

### [GET] /portfolios
**Beschreibung:** Alle Portfolios des eingeloggten Benutzers laden.

Statuscodes:
- `200` Erfolgreich
- `401` Kein Token
- `403` Ungültiger Token

### [POST] /portfolio
**Beschreibung:** Neues Portfolio erstellen.

**Request Body (Beispiel):**
```json
{
  "title": "Mein Portfolio",
  "description": "Kurzbeschreibung",
  "visibility": "private",
  "slug": "mein-portfolio"
}
```

Statuscodes:
- `201` Erstellt
- `400` Ungültige Eingaben
- `409` Slug bereits vergeben

### [GET] /portfolio/:id
**Beschreibung:** Einzelnes eigenes Portfolio laden.

Statuscodes:
- `200` Erfolgreich
- `404` Portfolio nicht gefunden
- `403` Kein Zugriff

### [PUT] /portfolio/:id
**Beschreibung:** Eigenes Portfolio aktualisieren.

Statuscodes:
- `200` Erfolgreich
- `400` Ungültige Eingaben
- `404` Portfolio nicht gefunden
- `403` Kein Zugriff
- `409` Slug bereits vergeben

### [DELETE] /portfolio/:id
**Beschreibung:** Eigenes Portfolio löschen.

Statuscodes:
- `204` Erfolgreich gelöscht
- `404` Portfolio nicht gefunden
- `403` Kein Zugriff

---

## Project Modul

### [GET] /portfolio/:id/projects
### [POST] /portfolio/:id/projects
### [PUT] /portfolio/:id/projects/:projectId
### [DELETE] /portfolio/:id/projects/:projectId

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `404` Projekt oder Portfolio nicht gefunden
- `403` Kein Zugriff

### [POST] /portfolio/:id/projects/:projectId/image
**Beschreibung:** Projektbild hochladen (multipart/form-data, Feld `image`).

**Response (201):**
```json
{
  "id": 123,
  "portfolioId": 10,
  "imageUrl": "/uploads/projects/project-...png",
  "updatedAt": "2026-..."
}
```

Statuscodes:
- `201` Upload erfolgreich
- `400` Keine Bilddatei / falscher Dateityp / Datei zu groß
- `404` Projekt nicht gefunden
- `403` Kein Zugriff

---

## Skill Modul

### [GET] /portfolio/:id/skills
### [POST] /portfolio/:id/skills
### [PUT] /portfolio/:id/skills/:portfolioSkillId
### [DELETE] /portfolio/:id/skills/:portfolioSkillId

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `404` Zuordnung nicht gefunden
- `403` Kein Zugriff
- `409` Skill bereits im Portfolio vorhanden

---

## SocialLink Modul

### [GET] /portfolio/:id/links
### [POST] /portfolio/:id/links
### [PUT] /portfolio/:id/links/:linkId
### [DELETE] /portfolio/:id/links/:linkId

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `404` Link nicht gefunden
- `403` Kein Zugriff

---

## Experience Modul

### [GET] /portfolio/:id/experiences
### [POST] /portfolio/:id/experiences
### [PUT] /portfolio/:id/experiences/:experienceId
### [DELETE] /portfolio/:id/experiences/:experienceId

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `404` Eintrag nicht gefunden
- `403` Kein Zugriff

---

## Education Modul

### [GET] /portfolio/:id/educations
### [POST] /portfolio/:id/educations
### [PUT] /portfolio/:id/educations/:educationId
### [DELETE] /portfolio/:id/educations/:educationId

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `404` Eintrag nicht gefunden
- `403` Kein Zugriff