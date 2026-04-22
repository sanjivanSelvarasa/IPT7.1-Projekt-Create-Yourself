**Autor:** Egor & Sanjivan
**Datum:** 02. April 2026

# Entity-Relationship Diagram

## Entitäten mit Attributen & PK/FK

---

### User

| Attribut           | Datentyp      | Schlüsseltyp |
| ------------------ | ------------- | ------------ |
| id                 | INT           | PK           |
| username           | NVARCHAR(50)  | UQ           |
| email              | NVARCHAR(100) | UQ           |
| password_hash      | NVARCHAR(255) | -            |
| first_name         | NVARCHAR(50)  | -            |
| last_name          | NVARCHAR(50)  | -            |
| profile_img        | NVARCHAR(255) | -            |
| bio                | NVARCHAR(MAX) | -            |
| preferred_language | NVARCHAR(10)  | -            |
| created_at         | DATETIME2     | -            |
| updated_at         | DATETIME2     | -            |

**Beschreibung:**  
Speichert die Benutzerdaten für Login, Profil und Spracheinstellungen.

Beziehung:

- User **1 - N** Portfolio
- User **1 - N** UserRefreshToken
- User **1 - N** Media

---

### UserRefreshToken

| Attribut   | Datentyp       | Schlüsseltyp |
| ---------- | -------------- | ------------ |
| id         | INT            | PK           |
| user_id    | INT            | FK → user.id |
| token_hash | NVARCHAR(2048) | UQ           |
| expires_at | DATETIME2      | -            |
| revoked_at | DATETIME2      | -            |
| created_at | DATETIME2      | -            |

**Beschreibung:**  
Speichert Refresh Tokens für die Authentifizierung und Gültigkeit.

---

### Template

| Attribut    | Datentyp      | Schlüsseltyp |
| ----------- | ------------- | ------------ |
| id          | INT           | PK           |
| name        | NVARCHAR(50)  | UQ           |
| description | NVARCHAR(MAX) | -            |
| layout_type | NVARCHAR(50)  | -            |
| preview_img | NVARCHAR(255) | -            |
| created_at  | DATETIME2     | -            |

**Beschreibung:**  
Enthält die verfügbaren Grundtemplates für das Portfolio-Layout.

Beziehung:

- Template **1 - N** Portfolio

---

### Theme

| Attribut         | Datentyp      | Schlüsseltyp      |
| ---------------- | ------------- | ----------------- |
| id               | INT           | PK                |
| portfolio_id     | INT           | FK → portfolio.id |
| primary_color    | NVARCHAR(20)  | -                 |
| secondary_color  | NVARCHAR(20)  | -                 |
| background_color | NVARCHAR(20)  | -                 |
| surface_color    | NVARCHAR(20)  | -                 |
| text_color       | NVARCHAR(20)  | -                 |
| accent_color     | NVARCHAR(20)  | -                 |
| font_family      | NVARCHAR(100) | -                 |
| created_at       | DATETIME2     | -                 |
| updated_at       | DATETIME2     | -                 |

**Beschreibung:**  
Speichert die Design-Einstellungen eines Portfolios.

Beziehung:

- Portfolio **1 - N** Theme

---

### Portfolio

| Attribut           | Datentyp      | Schlüsseltyp              |
| ------------------ | ------------- | ------------------------- |
| id                 | INT           | PK                        |
| user_id            | INT           | FK → user.id              |
| template_id        | INT           | FK → template.id          |
| current_theme_id   | INT           | FK → theme.id             |
| title              | NVARCHAR(100) | -                         |
| description        | NVARCHAR(MAX) | -                         |
| slug               | NVARCHAR(100) | UQ                        |
| visibility         | NVARCHAR(20)  | -                         |
| is_published       | BIT           | -                         |
| published_at       | DATETIME2     | -                         |
| current_version_id | INT           | FK → portfolio_version.id |
| language_code      | NVARCHAR(10)  | -                         |
| created_at         | DATETIME2     | -                         |
| updated_at         | DATETIME2     | -                         |

**Beschreibung:**  
Zentrale Tabelle für ein Portfolio. Enthält Metadaten, Veröffentlichungsstatus und FK's auf Template, Theme und aktuelle Version.

Beziehung:

- Portfolio **1 - 1** Theme
- Portfolio **1 - N** PortfolioVersion
- Portfolio **1 - N** Project
- Portfolio **1 - N** PortfolioSkill
- Portfolio **1 - N** SocialLink
- Portfolio **1 - N** Experience
- Portfolio **1 - N** Education
- Portfolio **1 - N** Media
- Portfolio **1 - N** PortfolioTranslation
- Portfolio **N - M** Skill _(über PortfolioSkill)_

---

### PortfolioVersion

| Attribut       | Datentyp      | Schlüsseltyp      |
| -------------- | ------------- | ----------------- |
| id             | INT           | PK                |
| portfolio_id   | INT           | FK → portfolio.id |
| version_number | INT           | -                 |
| title_snapshot | NVARCHAR(100) | -                 |
| is_published   | BIT           | -                 |
| created_at     | DATETIME2     | -                 |

**Beschreibung:**  
Speichert Versionen eines Portfolios, damit Entwürfe und frühere Stände wiederhergestellt werden können.

Beziehung:

- PortfolioVersion **1 - N** PortfolioSection
- Portfolio **1 - 1** PortfolioVersion

---

### PortfolioSection

| Attribut             | Datentyp      | Schlüsseltyp              |
| -------------------- | ------------- | ------------------------- |
| id                   | INT           | PK                        |
| portfolio_version_id | INT           | FK → portfolio_version.id |
| section_type         | NVARCHAR(50)  | -                         |
| title                | NVARCHAR(100) | -                         |
| sort_order           | INT           | -                         |
| is_visible           | BIT           | -                         |
| created_at           | DATETIME2     | -                         |
| updated_at           | DATETIME2     | -                         |

**Beschreibung:**  
Beschreibt die einzelnen Bereiche eines Portfolios innerhalb einer bestimmten Version, zb. Hero, Projekte oder Skills.

Beziehung:

- PortfolioSection **1 - N** EditorBlock

---

### EditorBlock

| Attribut     | Datentyp      | Schlüsseltyp              |
| ------------ | ------------- | ------------------------- |
| id           | INT           | PK                        |
| section_id   | INT           | FK → portfolio_section.id |
| block_type   | NVARCHAR(50)  | -                         |
| content_json | NVARCHAR(MAX) | -                         |
| sort_order   | INT           | -                         |
| created_at   | DATETIME2     | -                         |
| updated_at   | DATETIME2     | -                         |

**Beschreibung:**  
Speichert die eigentlichen Bausteine des Editors wie Text, Bild, Link oder andere Komponenten.

Beziehung:

- EditorBlock **N - 1** PortfolioSection

### Media

| Attribut     | Datentyp      | Schlüsseltyp      |
| ------------ | ------------- | ----------------- |
| id           | INT           | PK                |
| user_id      | INT           | FK → user.id      |
| portfolio_id | INT           | FK → portfolio.id |
| file_name    | NVARCHAR(255) | -                 |
| file_url     | NVARCHAR(255) | -                 |
| mime_type    | NVARCHAR(100) | -                 |
| file_size    | INT           | -                 |
| alt_text     | NVARCHAR(255) | -                 |
| created_at   | DATETIME2     | -                 |

**Beschreibung:**  
Verwaltet hochgeladene Medien wie Bilder für Profil, Projekte oder Editor-Blöcke.

Beziehung:

- Media **N - 1** User
- Media **N - 1** Portfolio

## Beziehung:

### Project

| Attribut     | Datentyp      | Schlüsseltyp      |
| ------------ | ------------- | ----------------- |
| id           | INT           | PK                |
| portfolio_id | INT           | FK → portfolio.id |
| title        | NVARCHAR(100) | -                 |
| description  | NVARCHAR(MAX) | -                 |
| sort_order   | INT           | -                 |
| img_url      | NVARCHAR(255) | -                 |
| project_url  | NVARCHAR(255) | -                 |
| github_url   | NVARCHAR(255) | -                 |
| start_date   | DATE          | -                 |
| end_date     | DATE          | -                 |
| created_at   | DATETIME2     | -                 |
| updated_at   | DATETIME2     | -                 |

**Beschreibung:**  
Speichert Projekte, die in einem Portfolio angezeigt werden.

Beziehung:

- Project **N - 1** Portfolio

### Skill

| Attribut    | Datentyp      | Schlüsseltyp |
| ----------- | ------------- | ------------ |
| id          | INT           | PK           |
| name        | NVARCHAR(50)  | UQ           |
| description | NVARCHAR(MAX) | -            |
| created_at  | DATETIME2     | -            |

**Beschreibung:**  
Skill-Tabelle die im Portfolio gezeigt werden kann.

Beziehung:

- Skill **1 - N** PortfolioSkill

---

### PortfolioSkill

| Attribut     | Datentyp  | Schlüsseltyp      |
| ------------ | --------- | ----------------- |
| id           | INT       | PK                |
| portfolio_id | INT       | FK → portfolio.id |
| skill_id     | INT       | FK → skill.id     |
| level        | TINYINT   | -                 |
| sort_order   | INT       | -                 |
| created_at   | DATETIME2 | -                 |

**Beschreibung:**  
Verbindet Skills mit einem Portfolio und speichert das Level vom Skill.

Beziehung:

- PortfolioSkill **N - 1** Portfolio
- PortfolioSkill **N - 1** Skill

### SocialLink

| Attribut     | Datentyp      | Schlüsseltyp      |
| ------------ | ------------- | ----------------- |
| id           | INT           | PK                |
| portfolio_id | INT           | FK → portfolio.id |
| platform     | NVARCHAR(50)  | -                 |
| url          | NVARCHAR(255) | -                 |
| created_at   | DATETIME2     | -                 |

**Beschreibung:**  
Speichert Social-Media oder Kontaktlinks für ein Portfolio.

Beziehung:

- SocialLink **N - 1** Portfolio

### Experience

| Attribut     | Datentyp      | Schlüsseltyp      |
| ------------ | ------------- | ----------------- |
| id           | INT           | PK                |
| portfolio_id | INT           | FK → portfolio.id |
| company_name | NVARCHAR(100) | -                 |
| position     | NVARCHAR(100) | -                 |
| sort_order   | INT           | -                 |
| description  | NVARCHAR(MAX) | -                 |
| start_date   | DATE          | -                 |
| end_date     | DATE          | -                 |
| created_at   | DATETIME2     | -                 |

**Beschreibung:**  
Speichert Berufserfahrungen, die im Portfolio dargestellt werden.

Beziehung:

- Experience **N - 1** Portfolio

### Education

| Attribut         | Datentyp      | Schlüsseltyp      |
| ---------------- | ------------- | ----------------- |
| id               | INT           | PK                |
| portfolio_id     | INT           | FK → portfolio.id |
| institution_name | NVARCHAR(100) | -                 |
| degree           | NVARCHAR(100) | -                 |
| field_of_study   | NVARCHAR(100) | -                 |
| sort_order       | INT           | -                 |
| start_date       | DATE          | -                 |
| end_date         | DATE          | -                 |
| created_at       | DATETIME2     | -                 |

**Beschreibung:**  
Speichert Ausbildungsinformationen für das Portfolio.

Beziehung:

- Education **N - 1** Portfolio

### PortfolioTranslation

| Attribut      | Datentyp      | Schlüsseltyp      |
| ------------- | ------------- | ----------------- |
| id            | INT           | PK                |
| portfolio_id  | INT           | FK → portfolio.id |
| language_code | NVARCHAR(10)  | -                 |
| title         | NVARCHAR(100) | -                 |
| description   | NVARCHAR(MAX) | -                 |
| created_at    | DATETIME2     | -                 |
| updated_at    | DATETIME2     | -                 |

**Beschreibung:**  
Ermöglicht Inhalte für Portfolio-Titel und Beschreibung mit verschiedenen Sprachen.

Beziehung:

- PortfolioTranslation **N - 1** Portfolio
