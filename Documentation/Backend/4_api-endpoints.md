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
Meldet einen bestehenden Benutzer an. Gibt einen kurzlebigen Access Token (20 min) zurück und setzt den Refresh Token als HttpOnly-Cookie.

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
  "accessToken": "string"
}
```

**Set-Cookie (Header):**
- `refreshToken=<token>; HttpOnly; Secure; SameSite=None`

Statuscodes:
- `200` Login erfolgreich
- `400` Ungültige oder fehlende E-Mail / Passwort
- `401` Ungültige E-Mail oder falsches Passwort

---

### [DELETE] /users/logout

**Beschreibung:**  
Meldet den Benutzer ab. Alle Refresh Tokens des Benutzers werden serverseitig invalidiert und das Refresh-Token-Cookie wird gelöscht. Erfordert einen gültigen Access Token im `Authorization`-Header.

**Header (erforderlich):**
- `Authorization: Bearer <accessToken>`

**Response (200):**
```json
{
  "message": "Logged out successfully."
}
```

Statuscodes:
- `200` Erfolgreich abgemeldet
- `401` Kein Access Token angegeben
- `403` Access Token ungültig oder abgelaufen

---

### [POST] /token

**Beschreibung:**  
Stellt einen neuen Access Token aus, wenn ein gültiger Refresh Token übergeben wird.

**Cookie (erforderlich):**
- `refreshToken=<token>`

**Response (200):**
```json
{
  "accessToken": "string"
}
```

Statuscodes:
- `200` Neuer Access Token ausgestellt
- `400` Refresh-Token-Cookie fehlt oder ist ungültig
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
  "languageCode": "de",
  "visibility": "private",
  "slug": "mein-portfolio",
  "template_id": 1
}
```

Statuscodes:
- `201` Erstellt
- `400` Ungültige Eingaben
- `401` Kein Token
- `403` Ungültiger Token
- `409` Slug bereits vergeben

### [GET] /portfolio/:id
**Beschreibung:** Einzelnes eigenes Portfolio laden.

Statuscodes:
- `200` Erfolgreich
- `401` Kein Token
- `404` Portfolio nicht gefunden
- `403` Kein Zugriff

### [GET] /portfolio/:id/full
**Beschreibung:** Einzelnes eigenes Portfolio inklusive aller aktuell implementierten Untermodule laden (Translations, Versions, Projects, Skills, SocialLinks, Experiences, Educations, Themes).

Statuscodes:
- `200` Erfolgreich
- `401` Kein Token
- `404` Portfolio nicht gefunden
- `403` Kein Zugriff

### [GET] /p/:slug
**Beschreibung:** Öffentliches Portfolio per Slug laden (nur wenn Sichtbarkeit `public`).

Statuscodes:
- `200` Erfolgreich
- `404` Portfolio nicht gefunden oder nicht öffentlich

### [GET] /p/:slug/full
**Beschreibung:** Öffentliches Portfolio inklusive aller aktuell implementierten Untermodule per Slug laden (Translations, Projects, Skills, SocialLinks, Experiences, Educations, Themes).

Statuscodes:
- `200` Erfolgreich
- `404` Portfolio nicht gefunden oder nicht öffentlich

### [GET] /p/:slug/available
**Beschreibung:** Prüft ob ein Slug noch frei ist (kein Login nötig).

**Response (200):**
```json
{ "available": true }
```

Statuscodes:
- `200` Immer (Ergebnis im Body)
- `400` Ungültiger Slug-Format

### [PUT] /portfolio/:id
**Beschreibung:** Eigenes Portfolio aktualisieren.

Statuscodes:
- `200` Erfolgreich
- `400` Ungültige Eingaben
- `401` Kein Token
- `404` Portfolio nicht gefunden
- `403` Kein Zugriff
- `409` Slug bereits vergeben

### [DELETE] /portfolio/:id
**Beschreibung:** Eigenes Portfolio löschen. Alle zugehörigen Daten (Versionen, Sections, Blocks, Projekte, Skills, Links, Erfahrungen, Ausbildungen, Themes, Übersetzungen) werden automatisch mitgelöscht.

Statuscodes:
- `204` Erfolgreich gelöscht
- `401` Kein Token
- `404` Portfolio nicht gefunden
- `403` Kein Zugriff

---

## Project Modul

### [GET] /portfolio/:id/projects
**Beschreibung:** Alle Projekte eines Portfolios laden.

### [POST] /portfolio/:id/projects
**Beschreibung:** Neues Projekt für ein Portfolio erstellen.

**Request Body:**
```json
{
  "title": "string (erforderlich, max. 100 Zeichen)",
  "description": "string (optional)",
  "imageUrl": "string (optional, gültige URL)",
  "projectUrl": "string (optional, gültige URL)",
  "githubUrl": "string (optional, gültige URL)",
  "sortOrder": "integer (optional, >= 0)",
  "startDate": "YYYY-MM-DD (optional)",
  "endDate": "YYYY-MM-DD (optional)"
}
```

### [GET] /portfolio/:id/projects/:projectId
**Beschreibung:** Einzelnes Projekt eines Portfolios laden.

### [PUT] /portfolio/:id/projects/:projectId
**Beschreibung:** Bestehendes Projekt aktualisieren (alle Felder optional).

### [DELETE] /portfolio/:id/projects/:projectId
**Beschreibung:** Projekt löschen.

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
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
- `401` Kein Token
- `404` Projekt nicht gefunden
- `403` Kein Zugriff

---

## Skill Modul

### [GET] /portfolio/:id/skills
**Beschreibung:** Alle Skills eines Portfolios laden.

### [POST] /portfolio/:id/skills
**Beschreibung:** Skill zum Portfolio hinzufügen. Existiert der Skill-Name noch nicht in der Datenbank, wird er automatisch angelegt.

**Request Body:**
```json
{
  "name": "string (erforderlich, max. 50 Zeichen)",
  "description": "string (optional)",
  "level": "integer (erforderlich, 1–100)",
  "sortOrder": "integer (optional, >= 0)"
}
```

### [GET] /portfolio/:id/skills/:portfolioSkillId
**Beschreibung:** Einzelne Skill-Zuordnung laden.

### [PUT] /portfolio/:id/skills/:portfolioSkillId
**Beschreibung:** Skill-Level oder Sortierung aktualisieren.

### [DELETE] /portfolio/:id/skills/:portfolioSkillId
**Beschreibung:** Skill-Zuordnung aus dem Portfolio entfernen.

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Zuordnung nicht gefunden
- `403` Kein Zugriff
- `409` Skill bereits im Portfolio vorhanden

---

## SocialLink Modul

### [GET] /portfolio/:id/links
**Beschreibung:** Alle Social-Links eines Portfolios laden.

### [POST] /portfolio/:id/links
**Beschreibung:** Neuen Social-Link für ein Portfolio erstellen.

**Request Body:**
```json
{
  "platform": "string (erforderlich, max. 50 Zeichen, z. B. \"GitHub\", \"LinkedIn\")",
  "url": "string (erforderlich, gültige URL)"
}
```

### [GET] /portfolio/:id/links/:linkId
**Beschreibung:** Einzelnen Social-Link laden.

### [PUT] /portfolio/:id/links/:linkId
**Beschreibung:** Bestehenden Social-Link aktualisieren.

### [DELETE] /portfolio/:id/links/:linkId
**Beschreibung:** Social-Link löschen.

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Link nicht gefunden
- `403` Kein Zugriff

---

## Experience Modul

### [GET] /portfolio/:id/experiences
**Beschreibung:** Alle Erfahrungseinträge eines Portfolios laden.

### [POST] /portfolio/:id/experiences
**Beschreibung:** Neuen Erfahrungseintrag für ein Portfolio erstellen.

**Request Body:**
```json
{
  "companyName": "string (erforderlich, max. 100 Zeichen)",
  "position": "string (erforderlich, max. 100 Zeichen)",
  "description": "string (optional)",
  "sortOrder": "integer (optional, >= 0)",
  "startDate": "YYYY-MM-DD (optional)",
  "endDate": "YYYY-MM-DD (optional)"
}
```

### [GET] /portfolio/:id/experiences/:experienceId
**Beschreibung:** Einzelnen Erfahrungseintrag laden.

### [PUT] /portfolio/:id/experiences/:experienceId
**Beschreibung:** Erfahrungseintrag aktualisieren (alle Felder optional).

### [DELETE] /portfolio/:id/experiences/:experienceId
**Beschreibung:** Erfahrungseintrag löschen.

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Eintrag nicht gefunden
- `403` Kein Zugriff

---

## Education Modul

### [GET] /portfolio/:id/educations
**Beschreibung:** Alle Ausbildungseinträge eines Portfolios laden.

### [POST] /portfolio/:id/educations
**Beschreibung:** Neuen Ausbildungseintrag für ein Portfolio erstellen.

**Request Body:**
```json
{
  "institutionName": "string (erforderlich, max. 100 Zeichen)",
  "degree": "string (erforderlich, max. 100 Zeichen)",
  "fieldOfStudy": "string (optional, max. 100 Zeichen)",
  "sortOrder": "integer (optional, >= 0)",
  "startDate": "YYYY-MM-DD (optional)",
  "endDate": "YYYY-MM-DD (optional)"
}
```

### [GET] /portfolio/:id/educations/:educationId
**Beschreibung:** Einzelnen Ausbildungseintrag laden.

### [PUT] /portfolio/:id/educations/:educationId
**Beschreibung:** Ausbildungseintrag aktualisieren (alle Felder optional).

### [DELETE] /portfolio/:id/educations/:educationId
**Beschreibung:** Ausbildungseintrag löschen.

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Eintrag nicht gefunden
- `403` Kein Zugriff

---

## Theme Modul

### [GET] /portfolio/:id/themes
**Beschreibung:** Alle Themes eines Portfolios laden.

### [POST] /portfolio/:id/themes
**Beschreibung:** Neues Theme für ein Portfolio anlegen.

**Request Body (Beispiel):**
```json
{
  "primaryColor": "#1f2937",
  "secondaryColor": "#4b5563",
  "backgroundColor": "#ffffff",
  "surfaceColor": "#f9fafb",
  "textColor": "#111827",
  "accentColor": "#2563eb",
  "fontFamily": "Poppins"
}
```

### [GET] /portfolio/:id/themes/:themeId
**Beschreibung:** Einzelnes Theme laden.

### [PUT] /portfolio/:id/themes/:themeId
**Beschreibung:** Theme aktualisieren.

### [DELETE] /portfolio/:id/themes/:themeId
**Beschreibung:** Theme löschen.

### [POST] /portfolio/:id/themes/:themeId/activate
**Beschreibung:** Theme als aktuelles Portfolio-Theme setzen (`current_theme_id`).

**Response (200) bei Aktivierung:**
```json
{
  "portfolioId": 10,
  "currentThemeId": 3
}
```

Statuscodes:
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Theme oder Portfolio nicht gefunden
- `403` Kein Zugriff

---

## PortfolioTranslation Modul

### [GET] /portfolio/:id/translations
**Beschreibung:** Alle Übersetzungen eines Portfolios laden.

### [POST] /portfolio/:id/translations
**Beschreibung:** Neue Übersetzung für ein Portfolio erstellen.

**Request Body (Beispiel):**
```json
{
  "languageCode": "en",
  "title": "My Portfolio",
  "description": "English translation"
}
```

### [GET] /portfolio/:id/translations/:translationId
**Beschreibung:** Einzelne Übersetzung laden.

### [PUT] /portfolio/:id/translations/:translationId
**Beschreibung:** Bestehende Übersetzung aktualisieren.

### [DELETE] /portfolio/:id/translations/:translationId
**Beschreibung:** Übersetzung löschen.

Statuscodes:
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Übersetzung oder Portfolio nicht gefunden
- `403` Kein Zugriff
- `409` Sprache bereits vorhanden oder entspricht der Hauptsprache des Portfolios

---

## PortfolioVersion Modul

### [GET] /portfolio/:id/versions
**Beschreibung:** Alle Versionen eines Portfolios laden.

### [POST] /portfolio/:id/versions
**Beschreibung:** Neue Version aus dem aktuellen Portfoliozustand erstellen.

**Response (201):**
```json
{
  "id": 5,
  "portfolioId": 10,
  "versionNumber": 2,
  "titleSnapshot": "Mein Portfolio",
  "isPublished": false,
  "createdAt": "2026-04-30T12:00:00.000Z"
}
```

### [GET] /portfolio/:id/versions/:versionId
**Beschreibung:** Konkrete Version laden.

### [DELETE] /portfolio/:id/versions/:versionId
**Beschreibung:** Version löschen. Alle zugehörigen Sections und Editor-Blöcke werden automatisch mitgelöscht.

### [POST] /portfolio/:id/versions/:versionId/activate
**Beschreibung:** Version als aktuelle Version setzen (`current_version_id`).

**Response (200) bei Aktivierung:**
```json
{
  "portfolioId": 10,
  "currentVersionId": 5
}
```

Statuscodes:
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Version oder Portfolio nicht gefunden
- `403` Kein Zugriff

---

## Template Modul

### [GET] /templates
**Beschreibung:** Verfügbare Templates abrufen.

### [GET] /templates/:templateId
**Beschreibung:** Ein einzelnes Template mit Details abrufen.

Hinweis:
- Die Zuweisung eines Templates zum Portfolio ist bereits indirekt über `POST /portfolio` und `PUT /portfolio/:id` möglich (`template_id`).

Statuscodes:
- `200`
- `404` Template nicht gefunden

---

## PortfolioSection Modul

### [GET] /portfolio/:id/versions/:versionId/sections
**Beschreibung:** Alle Sections einer Portfolio-Version laden.

### [POST] /portfolio/:id/versions/:versionId/sections
**Beschreibung:** Neue Section in einer Portfolio-Version erstellen.

**Request Body (Beispiel):**
```json
{
  "sectionType": "hero",
  "title": "Startbereich",
  "sortOrder": 1,
  "isVisible": true
}
```

### [GET] /portfolio/:id/versions/:versionId/sections/:sectionId
**Beschreibung:** Einzelne Section laden.

### [PUT] /portfolio/:id/versions/:versionId/sections/:sectionId
**Beschreibung:** Section aktualisieren (alle Felder optional).

### [DELETE] /portfolio/:id/versions/:versionId/sections/:sectionId
**Beschreibung:** Section löschen. Alle zugehörigen Editor-Blöcke werden automatisch mitgelöscht.

Statuscodes:
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Section, Version oder Portfolio nicht gefunden
- `403` Kein Zugriff

---

## EditorBlock Modul

### [GET] /portfolio/:id/versions/:versionId/sections/:sectionId/blocks
**Beschreibung:** Alle Editor-Blöcke einer Section laden.

### [POST] /portfolio/:id/versions/:versionId/sections/:sectionId/blocks
**Beschreibung:** Neuen Block in einer Section erstellen.

**Request Body (Beispiel):**
```json
{
  "blockType": "text",
  "contentJson": {
    "text": "Willkommen auf meinem Portfolio"
  },
  "sortOrder": 1
}
```

### [GET] /portfolio/:id/versions/:versionId/sections/:sectionId/blocks/:blockId
**Beschreibung:** Einzelnen Editor-Block laden.

### [PUT] /portfolio/:id/versions/:versionId/sections/:sectionId/blocks/:blockId
**Beschreibung:** Editor-Block aktualisieren.

### [DELETE] /portfolio/:id/versions/:versionId/sections/:sectionId/blocks/:blockId
**Beschreibung:** Editor-Block löschen.

Statuscodes:
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Block, Section, Version oder Portfolio nicht gefunden
- `403` Kein Zugriff

---

## Geplante Module (noch nicht implementiert)

Hinweis:
- Die folgenden Endpunkte sind fachlich dokumentiert, aber im aktuellen Backend-Code noch nicht als Route verfügbar.
- Aktueller Status im laufenden Backend: `404 Endpoint not found`.
- Die folgenden Statuscodes beschreiben den geplanten Soll-Zustand nach Implementierung.

---

### Media Modul

### [GET] /portfolio/:id/media
**Beschreibung:** Medien eines Portfolios abrufen.

### [POST] /portfolio/:id/media
**Beschreibung:** Mediendatei hochladen (multipart/form-data, Feld `file`).

### [PUT] /portfolio/:id/media/:mediaId
**Beschreibung:** Metadaten einer Mediendatei aktualisieren (z. B. `altText`).

### [DELETE] /portfolio/:id/media/:mediaId
**Beschreibung:** Mediendatei entfernen.

Statuscodes (geplant):
- `200`, `201`, `204`
- `400` Validierungsfehler / falscher Dateityp / Datei zu groß
- `404` Medium oder Portfolio nicht gefunden
- `403` Kein Zugriff

---

## Account Modul

Alle Endpunkte erfordern `Authorization: Bearer <accessToken>`.

### [GET] /account/profile
**Beschreibung:** Eigenes Profil laden.

**Response (200):**
```json
{
  "id": 1,
  "username": "john",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "profileImg": "/uploads/profiles/abc.jpg",
  "bio": "Kurzbeschreibung",
  "preferredLanguage": "de",
  "createdAt": "2026-...",
  "updatedAt": "2026-..."
}
```

Statuscodes:
- `200` Erfolgreich
- `401` Kein Token
- `403` Ungültiger Token

---

### [PUT] /account/profile
**Beschreibung:** Eigenes Profil aktualisieren (alle Felder optional).

**Request Body:**
```json
{
  "first_name": "string",
  "last_name": "string",
  "username": "string",
  "email": "string",
  "bio": "string (max 220 Zeichen)"
}
```

**Response (200):** Aktualisiertes Profil-Objekt (gleiche Struktur wie GET).

Statuscodes:
- `200` Erfolgreich
- `400` Validierungsfehler
- `401` Kein Token
- `403` Ungültiger Token
- `409` E-Mail oder Benutzername bereits vergeben

---

### [POST] /account/profile/picture
**Beschreibung:** Profilbild hochladen. Altes Bild wird automatisch gelöscht.

Request type: `multipart/form-data`, Feld `image` (PNG, JPG, WEBP, max 5 MB).

**Response (200):**
```json
{
  "id": 1,
  "profileImg": "/uploads/profiles/uuid.jpg",
  "updatedAt": "2026-..."
}
```

Statuscodes:
- `200` Erfolgreich
- `400` Kein Bild / falscher Typ / zu groß
- `401` Kein Token
- `403` Ungültiger Token

---

### [PUT] /account/language
**Beschreibung:** Bevorzugte Sprache setzen.

**Request Body:**
```json
{ "language_code": "de" }
```

**Response (200):**
```json
{
  "id": 1,
  "preferredLanguage": "de",
  "updatedAt": "2026-..."
}
```

Statuscodes:
- `200` Erfolgreich
- `400` Ungültiger Sprachcode
- `401` Kein Token
- `403` Ungültiger Token

---

### [PUT] /account/password
**Beschreibung:** Passwort ändern.

**Request Body:**
```json
{
  "current_password": "string",
  "new_password": "string (min 8 Zeichen)",
  "confirm_password": "string"
}
```

**Response (200):**
```json
{ "message": "Passwort erfolgreich geändert." }
```

Statuscodes:
- `200` Erfolgreich
- `400` Validierungsfehler / Passwörter stimmen nicht überein
- `401` Aktuelles Passwort falsch / kein Token
- `403` Ungültiger Token

---

### [DELETE] /account
**Beschreibung:** Eigenen Account permanent löschen inkl. aller Portfolios, Projekte, Uploads etc.

**Response (200):**
```json
{ "message": "Account erfolgreich gelöscht." }
```

Statuscodes:
- `200` Erfolgreich gelöscht
- `401` Kein Token
- `403` Ungültiger Token

