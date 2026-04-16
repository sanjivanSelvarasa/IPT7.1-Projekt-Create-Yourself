# Backend Documentation Overview

## Projektziel Backend

### Beschreibung
Das Backend ist die zentrale API-Schicht zwischen Frontend und MS SQL-Datenbank.
Es übernimmt Authentifizierung, Portfolio-Verwaltung, Modul-CRUDs und Medien-Upload.

### Verantwortungen Backend
- Benutzer sicher registrieren und einloggen
- Geschützte Endpunkte über JWT absichern
- Portfolios und Portfolio-Inhalte verwalten
- Projektbilder hochladen und als URL speichern
- Einheitliche Fehlerantworten liefern

### Hauptfunktionen
- Auth: Register, Login, Logout, Token-Refresh
- Portfolio CRUD
- Sub-CRUD für:
    - Projects
    - Skills
    - Social Links
    - Experiences
    - Educations
- Upload von Projektbildern (lokale Speicherung)

## Übersicht
- Projektziel Backend
    - Klares, modulares Backend mit verständlicher Struktur und nachvollziehbaren Endpunkten.

- Technologien
    - Node.js + Express
    - MS SQL (mssql)
    - Docker / Docker Compose
    - JWT + bcrypt
    - Multer (Datei-Upload)

- Modulübersicht
    - Authentifizierungsmodul
    - Portfolio Core Modul
    - Project Modul
    - Skill Modul
    - SocialLink Modul
    - Experience Modul
    - Education Modul
    - Upload Modul (Projektbilder)

- API-Endpunkte
    - Basis: Port 3000
    - Auth-Endpunkte: `/users/register`, `/users/login`, `/users/logout`, `/token`
    - Portfolio-Endpunkte: `/portfolio`, `/portfolio/:id`, `/portfolios`
    - Modul-Endpunkte unter `/portfolio/:id/...`

- Funktionsliste
    - Konkrete Funktionen sind in `5_function-list.md` aufgeführt.

- Datenbankbezug
    - Tabellen und Beziehungen sind in `6_database-relation.md` dokumentiert.

- Sicherheitskonzept
    - Passwort-Hashing, JWT-Prüfung, Ownership Checks und Input-Validierung.

- Fehlerbehandlung
    - Zentrale Error-Middleware mit klaren Statuscodes und JSON-Fehlerformat.

