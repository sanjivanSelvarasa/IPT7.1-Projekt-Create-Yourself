const sql = require('mssql')

const database = require('./database')

async function getProfileByEmail(email) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('email', sql.NVarChar(100), email)
        .query(`
            SELECT TOP 1
                id,
                username,
                email,
                first_name AS firstName,
                last_name AS lastName,
                profile_img AS profileImg,
                bio,
                preferred_language AS preferredLanguage,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM [User]
            WHERE LOWER(email) = LOWER(@email)
        `)

    return result.recordset[0]
}

async function findUserWithPasswordByEmail(email) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('email', sql.NVarChar(100), email)
        .query(`
            SELECT TOP 1
                id,
                email,
                password_hash AS passwordHash
            FROM [User]
            WHERE LOWER(email) = LOWER(@email)
        `)

    return result.recordset[0]
}

async function isEmailTakenByOther(email, excludeUserId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('email', sql.NVarChar(100), email)
        .input('excludeUserId', sql.Int, excludeUserId)
        .query(`SELECT COUNT(1) AS cnt FROM [User] WHERE LOWER(email) = LOWER(@email) AND id <> @excludeUserId`)

    return result.recordset[0].cnt > 0
}

async function isUsernameTakenByOther(username, excludeUserId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('username', sql.NVarChar(50), username)
        .input('excludeUserId', sql.Int, excludeUserId)
        .query(`SELECT COUNT(1) AS cnt FROM [User] WHERE LOWER(username) = LOWER(@username) AND id <> @excludeUserId`)

    return result.recordset[0].cnt > 0
}

async function updateProfile(userId, data) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('userId', sql.Int, userId)
        .input('firstName', sql.NVarChar(50), data.firstName)
        .input('lastName', sql.NVarChar(50), data.lastName)
        .input('username', sql.NVarChar(50), data.username)
        .input('email', sql.NVarChar(100), data.email)
        .input('bio', sql.NVarChar(sql.MAX), data.bio)
        .query(`
            UPDATE [User]
            SET
                first_name = @firstName,
                last_name = @lastName,
                username = @username,
                email = @email,
                bio = @bio,
                updated_at = SYSUTCDATETIME()
            OUTPUT
                inserted.id,
                inserted.username,
                inserted.email,
                inserted.first_name AS firstName,
                inserted.last_name AS lastName,
                inserted.profile_img AS profileImg,
                inserted.bio,
                inserted.preferred_language AS preferredLanguage,
                inserted.updated_at AS updatedAt
            WHERE id = @userId
        `)

    return result.recordset[0]
}

async function updatePassword(userId, newPasswordHash) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('userId', sql.Int, userId)
        .input('passwordHash', sql.NVarChar(255), newPasswordHash)
        .query(`
            UPDATE [User]
            SET
                password_hash = @passwordHash,
                updated_at = SYSUTCDATETIME()
            WHERE id = @userId
        `)
}

async function updateLanguage(userId, languageCode) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('userId', sql.Int, userId)
        .input('languageCode', sql.NVarChar(10), languageCode)
        .query(`
            UPDATE [User]
            SET
                preferred_language = @languageCode,
                updated_at = SYSUTCDATETIME()
            OUTPUT
                inserted.id,
                inserted.preferred_language AS preferredLanguage,
                inserted.updated_at AS updatedAt
            WHERE id = @userId
        `)

    return result.recordset[0]
}

async function updateProfilePicture(userId, profileImg) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('userId', sql.Int, userId)
        .input('profileImg', sql.NVarChar(255), profileImg)
        .query(`
            UPDATE [User]
            SET
                profile_img = @profileImg,
                updated_at = SYSUTCDATETIME()
            OUTPUT
                inserted.id,
                inserted.profile_img AS profileImg,
                inserted.updated_at AS updatedAt
            WHERE id = @userId
        `)

    return result.recordset[0]
}

async function getProjectImageUrlsByUserId(userId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('userId', sql.Int, userId)
        .query(`
            SELECT p.img_url AS imageUrl
            FROM Project p
            JOIN Portfolio po ON po.id = p.portfolio_id
            WHERE po.user_id = @userId
              AND p.img_url IS NOT NULL
              AND p.img_url <> ''
        `)
    return result.recordset
}

async function deleteUserCascade(userId) {
    const pool = await database.getPool()
    const transaction = new sql.Transaction(pool)
    await transaction.begin()

    try {
        const req = () => transaction.request().input('userId', sql.Int, userId)

        // Nullify circular FK references before deleting child rows
        await req().query(`
            UPDATE Portfolio
            SET current_version_id = NULL, current_theme_id = NULL
            WHERE user_id = @userId
        `)

        // Delete editor blocks inside portfolio sections
        await req().query(`
            DELETE eb FROM EditorBlock eb
            JOIN PortfolioSection ps ON ps.id = eb.section_id
            JOIN PortfolioVersion pv ON pv.id = ps.portfolio_version_id
            JOIN Portfolio p ON p.id = pv.portfolio_id
            WHERE p.user_id = @userId
        `)

        // Delete portfolio sections
        await req().query(`
            DELETE ps FROM PortfolioSection ps
            JOIN PortfolioVersion pv ON pv.id = ps.portfolio_version_id
            JOIN Portfolio p ON p.id = pv.portfolio_id
            WHERE p.user_id = @userId
        `)

        // Delete portfolio versions
        await req().query(`
            DELETE pv FROM PortfolioVersion pv
            JOIN Portfolio p ON p.id = pv.portfolio_id
            WHERE p.user_id = @userId
        `)

        // Delete themes
        await req().query(`
            DELETE t FROM Theme t
            JOIN Portfolio p ON p.id = t.portfolio_id
            WHERE p.user_id = @userId
        `)

        // Delete remaining portfolio child data
        await req().query(`DELETE j FROM Project j JOIN Portfolio p ON p.id = j.portfolio_id WHERE p.user_id = @userId`)
        await req().query(`DELETE j FROM PortfolioSkill j JOIN Portfolio p ON p.id = j.portfolio_id WHERE p.user_id = @userId`)
        await req().query(`DELETE j FROM SocialLink j JOIN Portfolio p ON p.id = j.portfolio_id WHERE p.user_id = @userId`)
        await req().query(`DELETE j FROM Experience j JOIN Portfolio p ON p.id = j.portfolio_id WHERE p.user_id = @userId`)
        await req().query(`DELETE j FROM Education j JOIN Portfolio p ON p.id = j.portfolio_id WHERE p.user_id = @userId`)
        await req().query(`DELETE j FROM PortfolioTranslation j JOIN Portfolio p ON p.id = j.portfolio_id WHERE p.user_id = @userId`)

        // Delete media linked to this user
        await req().query(`DELETE FROM Media WHERE user_id = @userId`)

        // Delete portfolios
        await req().query(`DELETE FROM Portfolio WHERE user_id = @userId`)

        // Delete refresh tokens
        await req().query(`DELETE FROM UserRefreshToken WHERE user_id = @userId`)

        // Delete the user itself
        await req().query(`DELETE FROM [User] WHERE id = @userId`)

        await transaction.commit()
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}

module.exports = {
    getProfileByEmail,
    findUserWithPasswordByEmail,
    isEmailTakenByOther,
    isUsernameTakenByOther,
    updateProfile,
    updatePassword,
    updateLanguage,
    updateProfilePicture,
    getProjectImageUrlsByUserId,
    deleteUserCascade
}
