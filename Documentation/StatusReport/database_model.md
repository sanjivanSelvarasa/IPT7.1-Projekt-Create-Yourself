# Datenbankmodell

## Tabelle: `User`

**Beschreibung:** Speichert die Benutzerdaten für Login, Profil und Spracheinstellungen. 

| Spalte             | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel | Beschreibung                   |
| ------------------ | --------- | -----: | ------------------ | ------------ | --------- | ------------------------------ |
| id                 | INT       |      - | nicht dokumentiert | Nein         | PK        | Eindeutige Benutzer-ID         |
| username           | NVARCHAR  |     50 | nicht dokumentiert | Nein         | UQ        | Eindeutiger Benutzername       |
| email              | NVARCHAR  |    100 | nicht dokumentiert | Nein         | UQ        | Eindeutige E-Mail-Adresse      |
| password_hash      | NVARCHAR  |    255 | nicht dokumentiert | Nein         | -         | Gehashter Passwortwert         |
| first_name         | NVARCHAR  |     50 | nicht dokumentiert | Ja           | -         | Vorname                        |
| last_name          | NVARCHAR  |     50 | nicht dokumentiert | Ja           | -         | Nachname                       |
| profile_img        | NVARCHAR  |    255 | nicht dokumentiert | Ja           | -         | Profilbild-URL                 |
| bio                | NVARCHAR  |    MAX | nicht dokumentiert | Ja           | -         | Kurzbeschreibung des Benutzers |
| preferred_language | NVARCHAR  |     10 | nicht dokumentiert | Ja           | -         | Bevorzugte Sprache             |
| created_at         | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -         | Erstellungszeitpunkt           |
| updated_at         | DATETIME2 |      - | nicht dokumentiert | Nein         | -         | Änderungszeitpunkt             |

Beziehung:

User 1 - N Portfolio
User 1 - N UserRefreshToken

---

## Tabelle: `UserRefreshToken`

**Beschreibung:** Speichert Refresh Tokens für Authentifizierung und Gültigkeit.

| Spalte     | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel    | Beschreibung            |
| ---------- | --------- | -----: | ------------------ | ------------ | ------------ | ----------------------- |
| id         | INT       |      - | nicht dokumentiert | Nein         | PK           | Eindeutige Token-ID     |
| user_id    | INT       |      - | nicht dokumentiert | Nein         | FK -> User.id | Zugehöriger Benutzer    |
| token_hash | NVARCHAR  |   2048 | nicht dokumentiert | Nein         | UQ           | Gehashter Refresh Token |
| expires_at | DATETIME2 |      - | nicht dokumentiert | Nein         | -            | Ablaufdatum des Tokens  |
| revoked_at | DATETIME2 |      - | nicht dokumentiert | Ja           | -            | Zeitpunkt der Sperrung  |
| created_at | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -            | Erstellungszeitpunkt    |

Beziehung:

UserRefreshToken N - 1 User

---

## Tabelle: `Template`

**Beschreibung:** Enthält verfügbare Grundtemplates für das Portfolio-Layout. 

| Spalte      | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel | Beschreibung               |
| ----------- | --------- | -----: | ------------------ | ------------ | --------- | -------------------------- |
| id          | INT       |      - | nicht dokumentiert | Nein         | PK        | Eindeutige Template-ID     |
| name        | NVARCHAR  |     50 | nicht dokumentiert | Nein         | UQ        | Name des Templates         |
| description | NVARCHAR  |    MAX | nicht dokumentiert | Ja           | -         | Beschreibung des Templates |
| layout_type | NVARCHAR  |     50 | nicht dokumentiert | Ja           | -         | Art des Layouts            |
| preview_img | NVARCHAR  |    255 | nicht dokumentiert | Ja           | -         | Vorschaubild-URL           |
| created_at  | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -         | Erstellungszeitpunkt       |


---

## Tabelle: `Theme`

**Beschreibung:** Speichert die Design-Einstellungen eines Portfolios.

| Spalte           | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel         | Beschreibung          |
| ---------------- | --------- | -----: | ------------------ | ------------ | ----------------- | --------------------- |
| id               | INT       |      - | nicht dokumentiert | Nein         | PK                | Eindeutige Theme-ID   |
| portfolio_id     | INT       |      - | nicht dokumentiert | Nein         | FK -> Portfolio.id | Zugehöriges Portfolio |
| primary_color    | NVARCHAR  |     20 | nicht dokumentiert | Ja           | -                 | Primärfarbe           |
| secondary_color  | NVARCHAR  |     20 | nicht dokumentiert | Ja           | -                 | Sekundärfarbe         |
| background_color | NVARCHAR  |     20 | nicht dokumentiert | Ja           | -                 | Hintergrundfarbe      |
| surface_color    | NVARCHAR  |     20 | nicht dokumentiert | Ja           | -                 | Flächenfarbe          |
| text_color       | NVARCHAR  |     20 | nicht dokumentiert | Ja           | -                 | Textfarbe             |
| accent_color     | NVARCHAR  |     20 | nicht dokumentiert | Ja           | -                 | Akzentfarbe           |
| font_family      | NVARCHAR  |    100 | nicht dokumentiert | Ja           | -                 | Schriftart            |
| created_at       | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                 | Erstellungszeitpunkt  |
| updated_at       | DATETIME2 |      - | nicht dokumentiert | Nein         | -                 | Änderungszeitpunkt    |

---

## Tabelle: `Portfolio`

**Beschreibung:** Zentrale Tabelle für ein Portfolio. Enthält Metadaten, Veröffentlichungsstatus und Verweise auf Template, Theme und aktuelle Version.

| Spalte             | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel                | Beschreibung                       |
| ------------------ | --------- | -----: | ------------------ | ------------ | ------------------------ | ---------------------------------- |
| id                 | INT       |      - | nicht dokumentiert | Nein         | PK                       | Eindeutige Portfolio-ID            |
| user_id            | INT       |      - | nicht dokumentiert | Nein         | FK -> User.id             | Besitzer des Portfolios            |
| template_id        | INT       |      - | nicht dokumentiert | Nein         | FK -> Template.id         | Zugewiesenes Template              |
| current_theme_id   | INT       |      - | nicht dokumentiert | Ja           | FK -> Theme.id            | Aktives Theme                      |
| title              | NVARCHAR  |    100 | nicht dokumentiert | Nein         | -                        | Titel des Portfolios               |
| description        | NVARCHAR  |    MAX | nicht dokumentiert | Ja           | -                        | Kurzbeschreibung                   |
| slug               | NVARCHAR  |    100 | nicht dokumentiert | Nein         | UQ                       | Öffentlicher eindeutiger Slug      |
| visibility         | NVARCHAR  |     20 | nicht dokumentiert | Nein         | -                        | Sichtbarkeit, z. B. private/public |
| is_published       | BIT       |      - | nicht dokumentiert | Nein         | -                        | Veröffentlichungsstatus            |
| published_at       | DATETIME2 |      - | nicht dokumentiert | Ja           | -                        | Veröffentlichungszeitpunkt         |
| current_version_id | INT       |      - | nicht dokumentiert | Ja           | FK -> PortfolioVersion.id | Aktuelle Version                   |
| language_code      | NVARCHAR  |     10 | nicht dokumentiert | Ja           | -                        | Standardsprache                    |
| created_at         | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                        | Erstellungszeitpunkt               |
| updated_at         | DATETIME2 |      - | nicht dokumentiert | Nein         | -                        | Änderungszeitpunkt                 |

Beziehung:

Portfolio 1 - N Project
Portfolio 1 - N SocialLink
Portfolio 1 - N Experience
Portfolio 1 - N Education
Portfolio N - M Skill (über PortfolioSkill)

---

## Tabelle: `PortfolioVersion`

**Beschreibung:** Speichert Versionen eines Portfolios, damit frühere Stände wiederhergestellt werden können. 

| Spalte         | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel         | Beschreibung                                   |
| -------------- | --------- | -----: | ------------------ | ------------ | ----------------- | ---------------------------------------------- |
| id             | INT       |      - | nicht dokumentiert | Nein         | PK                | Eindeutige Versions-ID                         |
| portfolio_id   | INT       |      - | nicht dokumentiert | Nein         | FK -> Portfolio.id | Zugehöriges Portfolio                          |
| version_number | INT       |      - | nicht dokumentiert | Nein         | -                 | Laufende Versionsnummer                        |
| title_snapshot | NVARCHAR  |    100 | nicht dokumentiert | Nein         | -                 | Gespeicherter Titelstand                       |
| is_published   | BIT       |      - | nicht dokumentiert | Nein         | -                 | Gibt an, ob diese Version veröffentlicht wurde |
| created_at     | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                 | Erstellungszeitpunkt                           |

---

## Tabelle: `PortfolioSection`

**Beschreibung:** Beschreibt die einzelnen Bereiche eines Portfolios innerhalb einer Version, zb. Hero, Projekte oder Skills. 

| Spalte               | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel                | Beschreibung                 |
| -------------------- | --------- | -----: | ------------------ | ------------ | ------------------------ | ---------------------------- |
| id                   | INT       |      - | nicht dokumentiert | Nein         | PK                       | Eindeutige Section-ID        |
| portfolio_version_id | INT       |      - | nicht dokumentiert | Nein         | FK -> PortfolioVersion.id | Zugehörige Portfolio-Version |
| section_type         | NVARCHAR  |     50 | nicht dokumentiert | Nein         | -                        | Art des Bereichs             |
| title                | NVARCHAR  |    100 | nicht dokumentiert | Ja           | -                        | Titel der Section            |
| sort_order           | INT       |      - | nicht dokumentiert | Nein         | -                        | Reihenfolge im Layout        |
| is_visible           | BIT       |      - | nicht dokumentiert | Nein         | -                        | Sichtbarkeit der Section     |
| created_at           | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                        | Erstellungszeitpunkt         |
| updated_at           | DATETIME2 |      - | nicht dokumentiert | Nein         | -                        | Änderungszeitpunkt           |

---

## Tabelle: `EditorBlock`

**Beschreibung:** Speichert die eigentlichen Bausteine des Editors wie Text, Bild, Link oder andere Komponenten. 

| Spalte       | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel                | Beschreibung                      |
| ------------ | --------- | -----: | ------------------ | ------------ | ------------------------ | --------------------------------- |
| id           | INT       |      - | nicht dokumentiert | Nein         | PK                       | Eindeutige Block-ID               |
| section_id   | INT       |      - | nicht dokumentiert | Nein         | FK -> PortfolioSection.id | Zugehörige Section                |
| block_type   | NVARCHAR  |     50 | nicht dokumentiert | Nein         | -                        | Blocktyp                          |
| content_json | NVARCHAR  |    MAX | nicht dokumentiert | Ja           | -                        | Inhalt des Blocks als JSON        |
| sort_order   | INT       |      - | nicht dokumentiert | Nein         | -                        | Reihenfolge innerhalb der Section |
| created_at   | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                        | Erstellungszeitpunkt              |
| updated_at   | DATETIME2 |      - | nicht dokumentiert | Nein         | -                        | Änderungszeitpunkt                |

---

## Tabelle: `Media`

**Beschreibung:** Verwaltet hochgeladene Medien wie Bilder für Profil, Projekte oder Editor-Blöcke. 

| Spalte       | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel         | Beschreibung          |
| ------------ | --------- | -----: | ------------------ | ------------ | ----------------- | --------------------- |
| id           | INT       |      - | nicht dokumentiert | Nein         | PK                | Eindeutige Medien-ID  |
| user_id      | INT       |      - | nicht dokumentiert | Nein         | FK -> User.id      | Hochladender Benutzer |
| portfolio_id | INT       |      - | nicht dokumentiert | Nein         | FK -> Portfolio.id | Zugehöriges Portfolio |
| file_name    | NVARCHAR  |    255 | nicht dokumentiert | Nein         | -                 | Dateiname             |
| file_url     | NVARCHAR  |    255 | nicht dokumentiert | Nein         | -                 | Speicher-/Abrufpfad   |
| mime_type    | NVARCHAR  |    100 | nicht dokumentiert | Nein         | -                 | MIME-Typ der Datei    |
| file_size    | INT       |      - | nicht dokumentiert | Nein         | -                 | Dateigrösse           |
| alt_text     | NVARCHAR  |    255 | nicht dokumentiert | Ja           | -                 | Alternativtext        |
| created_at   | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                 | Erstellungszeitpunkt  |

---

## Tabelle: `Project`

**Beschreibung:** Speichert Projekte, die in einem Portfolio angezeigt werden. Projektbilder werden als URL gespeichert.  

| Spalte       | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel         | Beschreibung             |
| ------------ | --------- | -----: | ------------------ | ------------ | ----------------- | ------------------------ |
| id           | INT       |      - | nicht dokumentiert | Nein         | PK                | Eindeutige Projekt-ID    |
| portfolio_id | INT       |      - | nicht dokumentiert | Nein         | FK -> Portfolio.id | Zugehöriges Portfolio    |
| title        | NVARCHAR  |    100 | nicht dokumentiert | Nein         | -                 | Projekttitel             |
| description  | NVARCHAR  |    MAX | nicht dokumentiert | Ja           | -                 | Projektbeschreibung      |
| sort_order   | INT       |      - | nicht dokumentiert | Nein         | -                 | Reihenfolge im Portfolio |
| img_url      | NVARCHAR  |    255 | nicht dokumentiert | Ja           | -                 | URL des Projektbildes    |
| project_url  | NVARCHAR  |    255 | nicht dokumentiert | Ja           | -                 | Link zum Projekt         |
| github_url   | NVARCHAR  |    255 | nicht dokumentiert | Ja           | -                 | Link zum Repository      |
| start_date   | DATE      |      - | nicht dokumentiert | Ja           | -                 | Startdatum               |
| end_date     | DATE      |      - | nicht dokumentiert | Ja           | -                 | Enddatum                 |
| created_at   | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                 | Erstellungszeitpunkt     |
| updated_at   | DATETIME2 |      - | nicht dokumentiert | Nein         | -                 | Änderungszeitpunkt       |

Beziehung:

Project N - 1 Portfolio

---

## Tabelle: `Skill`

**Beschreibung:** Skill-Tabelle, die im Portfolio gezeigt werden kann.  

| Spalte      | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel | Beschreibung            |
| ----------- | --------- | -----: | ------------------ | ------------ | --------- | ----------------------- |
| id          | INT       |      - | nicht dokumentiert | Nein         | PK        | Eindeutige Skill-ID     |
| name        | NVARCHAR  |     50 | nicht dokumentiert | Nein         | UQ        | Skill-Name              |
| description | NVARCHAR  |    MAX | nicht dokumentiert | Ja           | -         | Beschreibung des Skills |
| created_at  | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -         | Erstellungszeitpunkt    |

Beziehung:

Skill 1 - N PortfolioSkill

---

## Tabelle: `PortfolioSkill`

**Beschreibung:** Verbindet Skills mit einem Portfolio und speichert das Skill-Level. Zwischentabelle für die n:m-Beziehung zwischen `Portfolio` und `Skill`.  

| Spalte       | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel         | Beschreibung             |
| ------------ | --------- | -----: | ------------------ | ------------ | ----------------- | ------------------------ |
| id           | INT       |      - | nicht dokumentiert | Nein         | PK                | Eindeutige Zuordnungs-ID |
| portfolio_id | INT       |      - | nicht dokumentiert | Nein         | FK -> Portfolio.id | Zugehöriges Portfolio    |
| skill_id     | INT       |      - | nicht dokumentiert | Nein         | FK -> Skill.id     | Zugehöriger Skill        |
| level        | TINYINT   |      - | nicht dokumentiert | Nein         | -                 | Skill-Level              |
| sort_order   | INT       |      - | nicht dokumentiert | Nein         | -                 | Reihenfolge der Anzeige  |
| created_at   | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                 | Erstellungszeitpunkt     |

Beziehung:

PortfolioSkill N - 1 Portfolio
PortfolioSkill N - 1 Skill

---

## Tabelle: `SocialLink`

**Beschreibung:** Speichert Social-Media- oder Kontaktlinks für ein Portfolio. 

| Spalte       | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel         | Beschreibung          |
| ------------ | --------- | -----: | ------------------ | ------------ | ----------------- | --------------------- |
| id           | INT       |      - | nicht dokumentiert | Nein         | PK                | Eindeutige Link-ID    |
| portfolio_id | INT       |      - | nicht dokumentiert | Nein         | FK -> Portfolio.id | Zugehöriges Portfolio |
| platform     | NVARCHAR  |     50 | nicht dokumentiert | Nein         | -                 | Plattformname         |
| url          | NVARCHAR  |    255 | nicht dokumentiert | Nein         | -                 | Link-URL              |
| created_at   | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                 | Erstellungszeitpunkt  |

Beziehung:

SocialLink N - 1 Portfolio

---

## Tabelle: `Experience`

**Beschreibung:** Speichert Berufserfahrungen, die im Portfolio dargestellt werden. 

| Spalte       | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel         | Beschreibung             |
| ------------ | --------- | -----: | ------------------ | ------------ | ----------------- | ------------------------ |
| id           | INT       |      - | nicht dokumentiert | Nein         | PK                | Eindeutige Experience-ID |
| portfolio_id | INT       |      - | nicht dokumentiert | Nein         | FK -> Portfolio.id | Zugehöriges Portfolio    |
| company_name | NVARCHAR  |    100 | nicht dokumentiert | Nein         | -                 | Firmenname               |
| position     | NVARCHAR  |    100 | nicht dokumentiert | Nein         | -                 | Position / Rolle         |
| sort_order   | INT       |      - | nicht dokumentiert | Nein         | -                 | Reihenfolge der Anzeige  |
| description  | NVARCHAR  |    MAX | nicht dokumentiert | Ja           | -                 | Tätigkeitsbeschreibung   |
| start_date   | DATE      |      - | nicht dokumentiert | Ja           | -                 | Startdatum               |
| end_date     | DATE      |      - | nicht dokumentiert | Ja           | -                 | Enddatum                 |
| created_at   | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                 | Erstellungszeitpunkt     |

Beziehung:

Experience N - 1 Portfolio

---

## Tabelle: `Education`

**Beschreibung:** Speichert Ausbildungsinformationen für das Portfolio. 

| Spalte           | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel         | Beschreibung            |
| ---------------- | --------- | -----: | ------------------ | ------------ | ----------------- | ----------------------- |
| id               | INT       |      - | nicht dokumentiert | Nein         | PK                | Eindeutige Education-ID |
| portfolio_id     | INT       |      - | nicht dokumentiert | Nein         | FK -> Portfolio.id | Zugehöriges Portfolio   |
| institution_name | NVARCHAR  |    100 | nicht dokumentiert | Nein         | -                 | Name der Institution    |
| degree           | NVARCHAR  |    100 | nicht dokumentiert | Ja           | -                 | Abschluss               |
| field_of_study   | NVARCHAR  |    100 | nicht dokumentiert | Ja           | -                 | Fachrichtung            |
| sort_order       | INT       |      - | nicht dokumentiert | Nein         | -                 | Reihenfolge der Anzeige |
| start_date       | DATE      |      - | nicht dokumentiert | Ja           | -                 | Startdatum              |
| end_date         | DATE      |      - | nicht dokumentiert | Ja           | -                 | Enddatum                |
| created_at       | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                 | Erstellungszeitpunkt    |

Beziehung:

Education N - 1 Portfolio

---

## Tabelle: `PortfolioTranslation`

**Beschreibung:** Ermöglicht mehrsprachige Inhalte für Portfolio-Titel und Beschreibung.

| Spalte        | Datentyp  | Grösse | Standardwert       | Null erlaubt | Schlüssel         | Beschreibung               |
| ------------- | --------- | -----: | ------------------ | ------------ | ----------------- | -------------------------- |
| id            | INT       |      - | nicht dokumentiert | Nein         | PK                | Eindeutige Übersetzungs-ID |
| portfolio_id  | INT       |      - | nicht dokumentiert | Nein         | FK -> Portfolio.id | Zugehöriges Portfolio      |
| language_code | NVARCHAR  |     10 | nicht dokumentiert | Nein         | -                 | Sprachcode                 |
| title         | NVARCHAR  |    100 | nicht dokumentiert | Ja           | -                 | Übersetzter Titel          |
| description   | NVARCHAR  |    MAX | nicht dokumentiert | Ja           | -                 | Übersetzte Beschreibung    |
| created_at    | DATETIME2 |      - | DEFAULT CURRENT_TIMESTAMP | Nein         | -                 | Erstellungszeitpunkt       |
| updated_at    | DATETIME2 |      - | nicht dokumentiert | Nein         | -                 | Änderungszeitpunkt         |

---