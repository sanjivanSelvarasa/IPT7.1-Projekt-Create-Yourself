**Lead: Gian**

Simple guide to use this backend.

## 1) Start the backend

From `Project/` run:

```bash
docker compose up -d --build
```

Backend runs on:

`http://localhost:3000`

## 2) How authentication works

1. Register a user (`POST /users/register`)
2. Login (`POST /users/login`)
3. Copy the returned `accessToken`
4. Send token in protected routes:

`Authorization: Bearer <accessToken>`

## 3) Main API idea

1. Create and manage portfolios
2. Add modules inside a portfolio:
	- Translations
	- Versions
	- Projects
	- Skills
	- Social Links
	- Experiences
	- Educations
3. Manage your own account (profile, password, language, profile picture)

All portfolio module routes are under:

`/portfolio/:id/...`

All account routes are under:

`/account/...`

## 4) Image upload

### Project image

`POST /portfolio/:id/projects/:projectId/image`

Request type: `multipart/form-data`, field name `image`

Result: file saved in `uploads/projects/`, `imageUrl` saved in DB as `/uploads/projects/<filename>`.
Accessible at: `http://localhost:3000/uploads/projects/<filename>`

Old images are automatically deleted when replaced or when the project is deleted.

### Skill image

`POST /portfolio/:id/skills/:portfolioSkillId/image`

Request type: `multipart/form-data`, field name `image`

Result: file saved in `uploads/modules/`, `imageUrl` saved in DB as `/uploads/modules/<filename>`.
Accessible at: `http://localhost:3000/uploads/modules/<filename>`

Old images are automatically deleted when replaced or when the skill assignment is deleted.

### Experience image

`POST /portfolio/:id/experiences/:experienceId/image`

Request type: `multipart/form-data`, field name `image`

Result: file saved in `uploads/modules/`, `imageUrl` saved in DB as `/uploads/modules/<filename>`.
Accessible at: `http://localhost:3000/uploads/modules/<filename>`

Old images are automatically deleted when replaced or when the experience entry is deleted.

### Profile picture

`POST /account/profile/picture`

Request type: `multipart/form-data`, field name `image`

Result: file saved in `uploads/profiles/`, `profileImg` saved in DB as `/uploads/profiles/<filename>`.
Accessible at: `http://localhost:3000/uploads/profiles/<filename>`

Old pictures are automatically deleted when replaced or when the account is deleted.

## 5) Account management

| Method | Route | Description |
|---|---|---|
| `GET` | `/account/profile` | Read own profile |
| `PUT` | `/account/profile` | Update profile (firstName, lastName, username, email, bio) |
| `POST` | `/account/profile/picture` | Upload profile picture |
| `PUT` | `/account/language` | Set preferred language (`{ "language_code": "de" }`) |
| `PUT` | `/account/password` | Change password (`current_password`, `new_password` ≥8 chars, `confirm_password`) |
| `DELETE` | `/account` | Delete own account (full cascade) |

## 6) Easiest way to test

Use VS Code REST Client with:

1. `Project/Backend/examplerequests.rest` (auth + portfolio basics)
2. `Project/Backend/examplerequests.modules.rest` (translations, versions, module CRUD + upload)

## 7) Notes

1. SQL data is persisted in Docker volume `mssql-data`
2. Uploaded image files are persisted in Docker volume `backend-uploads` (mounted at `/app/uploads`)

If something is unclear, ask directly.
to play around with the backend simply use the examplerequests.rest and examplerequests.modules.rest files with the VS-CODE Rest-Client Extension!