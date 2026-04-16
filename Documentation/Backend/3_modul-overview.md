### Backend-Module

| Modulname        | Beschreibung                          |
|------------------|--------------------------------------|
| Auth             | Login, Registrierung, Logout, Token-Refresh |
| Portfolio        | Portfolio CRUD und Ownership-Prüfung |
| Project          | CRUD für Projekte innerhalb eines Portfolios |
| Skill            | CRUD für PortfolioSkill-Zuordnungen |
| SocialLink       | CRUD für Social Links im Portfolio |
| Experience       | CRUD für Berufserfahrungen |
| Education        | CRUD für Bildungsdaten |
| Upload           | Projektbild-Upload und URL-Speicherung |
| Validation/Errors| Gemeinsame Validierung + Fehlerformat |

### Moduldetails

#### Modul: Auth
- Zweck:
    Dieses Modul ist für Registrierung, Login, Logout und Token-Refresh zuständig.
    Es stellt Access- und Refresh-Tokens bereit und schützt private API-Routen.
- Hauptfunktionen:
    - Benutzer registrieren
    - Benutzer einloggen
    - Benutzer ausloggen
    - Access Token erstellen
    - Refresh Token erneuern
    - Passwörter hashen und prüfen
    - Authentifizierung per JWT prüfen
- Abhängigkeiten:
    - Auth-Model
    - bcrypt
    - jsonwebtoken (JWT)
    - Auth-Middleware
    - Error Handling

#### Modul: Portfolio
- Zweck:
    Kernmodul für Portfolio-Daten (Titel, Beschreibung, Slug, Sichtbarkeit).
    Enthält die Haupt-CRUD-Operationen und Zugriffskontrolle pro Benutzer.
- Hauptfunktionen:
    - Portfolio erstellen
    - Eigene Portfolios abrufen
    - Einzelnes Portfolio abrufen
    - Portfolio aktualisieren
    - Portfolio löschen
- Abhängigkeiten:
    - Portfolio-Model
    - Access-Helper (Ownership)
    - Validatoren

#### Modul: Project
- Zweck:
    Verwaltung von Projekten pro Portfolio.
- Hauptfunktionen:
    - Projekte auflisten
    - Projekt anlegen
    - Projekt aktualisieren
    - Projekt löschen
- Abhängigkeiten:
    - Project-Model
    - Access-Helper (Ownership)
    - Validatoren

#### Modul: Skill
- Zweck:
    Verwaltung der Skill-Zuordnungen pro Portfolio über `PortfolioSkill`.
- Hauptfunktionen:
    - Skills auflisten
    - Skill-Zuordnung erstellen
    - Skill-Level aktualisieren
    - Skill-Zuordnung löschen
- Abhängigkeiten:
    - Skill-Model
    - Access-Helper
    - Validatoren

#### Modul: SocialLink
- Zweck:
    Verwaltung der sozialen Profile/Links pro Portfolio.
- Hauptfunktionen:
    - Links auflisten
    - Link anlegen
    - Link aktualisieren
    - Link löschen
- Abhängigkeiten:
    - SocialLink-Model
    - Access-Helper
    - Validatoren

#### Modul: Experience
- Zweck:
    Verwaltung beruflicher Stationen pro Portfolio.
- Hauptfunktionen:
    - Experience-Einträge auflisten
    - Experience-Eintrag anlegen
    - Experience-Eintrag aktualisieren
    - Experience-Eintrag löschen
- Abhängigkeiten:
    - Experience-Model
    - Access-Helper
    - Validatoren

#### Modul: Education
- Zweck:
    Verwaltung von Bildungsdaten pro Portfolio.
- Hauptfunktionen:
    - Education-Einträge auflisten
    - Education-Eintrag anlegen
    - Education-Eintrag aktualisieren
    - Education-Eintrag löschen
- Abhängigkeiten:
    - Education-Model
    - Access-Helper
    - Validatoren

#### Modul: Upload
- Zweck:
    Upload von Projektbildern inklusive lokaler Speicherung und Rückgabe einer abrufbaren URL.
- Hauptfunktionen:
    - Bilddatei entgegennehmen (multipart/form-data)
    - Dateityp und Dateigröße prüfen
    - Datei lokal speichern
    - URL in `Project.img_url` speichern
- Abhängigkeiten:
    - Multer Middleware
    - Project-Service und Project-Model
    - Express Static Serving (`/uploads`)

