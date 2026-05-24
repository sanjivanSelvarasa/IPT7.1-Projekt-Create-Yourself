### Backend-Module

| Modulname              | Beschreibung                                          |
|------------------------|-------------------------------------------------------|
| Auth                   | Login, Registrierung, Logout, Token-Refresh           |
| Account                | Profilverwaltung, Passwort, Sprache, Account-Löschung |
| Portfolio              | Portfolio CRUD und Ownership-Prüfung                  |
| PortfolioTranslation   | CRUD für Übersetzungen eines Portfolios               |
| PortfolioVersion       | CRUD + Aktivierung von Portfolio-Versionen            |
| PortfolioSection       | CRUD für Sections innerhalb einer Portfolio-Version   |
| Project                | CRUD für Projekte innerhalb eines Portfolios          |
| Skill                  | CRUD für PortfolioSkill-Zuordnungen                   |
| SocialLink             | CRUD für Social Links im Portfolio                    |
| Experience             | CRUD für Berufserfahrungen                            |
| Education              | CRUD für Bildungsdaten                                |
| Theme                  | CRUD + Aktivierung von Portfolio-Themes               |
| Template               | Abrufen verfügbarer Templates                         |
| Upload                 | Bild-Upload (Projektbilder & Profilbilder)            |
| Validation/Errors      | Gemeinsame Validierung + Fehlerformat                 |

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

#### Modul: Account
- Zweck:
    Verwaltung der eigenen Benutzerdaten (Profil, Passwort, Sprache, Profilbild, Account-Löschung).
- Hauptfunktionen:
    - Profil laden
    - Profil aktualisieren
    - Profilbild hochladen
    - Bevorzugte Sprache setzen
    - Passwort ändern
    - Account permanent löschen
- Abhängigkeiten:
    - Account-Service und Account-Model
    - Upload-Middleware (Multer)
    - Auth-Middleware

#### Modul: PortfolioTranslation
- Zweck:
    Verwaltung von Übersetzungen (Titel, Beschreibung) eines Portfolios in verschiedenen Sprachen.
- Hauptfunktionen:
    - Übersetzungen auflisten
    - Übersetzung anlegen
    - Übersetzung aktualisieren
    - Übersetzung löschen
- Abhängigkeiten:
    - Portfolio-Service
    - Access-Helper
    - Validatoren

#### Modul: PortfolioVersion
- Zweck:
    Versionierung des Portfoliozustands. Ermöglicht das Erstellen, Laden und Aktivieren von Snapshots.
- Hauptfunktionen:
    - Versionen auflisten
    - Version erstellen (Snapshot)
    - Einzelne Version laden
    - Version löschen
    - Version aktivieren
- Abhängigkeiten:
    - Portfolio-Service
    - Access-Helper

#### Modul: PortfolioSection
- Zweck:
    Verwaltung von Sections (Abschnitten) innerhalb einer Portfolio-Version.
- Hauptfunktionen:
    - Sections auflisten
    - Section anlegen
    - Section aktualisieren
    - Section löschen
- Abhängigkeiten:
    - Section-Service und Section-Model
    - Portfolio-Model (Versions-Prüfung)
    - Access-Helper
    - Validatoren

#### Modul: Theme
- Zweck:
    Verwaltung von Farbschemata und Schriftarten pro Portfolio.
- Hauptfunktionen:
    - Themes auflisten
    - Theme anlegen
    - Theme aktualisieren
    - Theme löschen
    - Theme aktivieren
- Abhängigkeiten:
    - Theme-Service und Theme-Model
    - Access-Helper

#### Modul: Template
- Zweck:
    Bereitstellung verfügbarer Portfolio-Templates zur Auswahl.
- Hauptfunktionen:
    - Alle Templates abrufen
    - Einzelnes Template abrufen
- Abhängigkeiten:
    - Template-Service und Template-Model

#### Modul: Upload
- Zweck:
    Upload von Bilddateien (Projektbilder und Profilbilder) inklusive lokaler Speicherung und URL-Rückgabe.
- Hauptfunktionen:
    - Bilddatei entgegennehmen (multipart/form-data)
    - Dateityp (MIME + Dateiendung) und Dateigröße prüfen
    - Datei lokal speichern
    - URL in `Project.img_url` bzw. `Account.profile_img` speichern
- Abhängigkeiten:
    - Multer Middleware
    - Project-Service / Account-Service
    - Express Static Serving (`/uploads`)

