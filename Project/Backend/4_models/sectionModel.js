const sql = require('mssql')

const database = require('./database')

async function getSectionsByVersionId(versionId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('versionId', sql.Int, versionId)
        .query(`
            SELECT
                id,
                portfolio_version_id AS versionId,
                section_type AS sectionType,
                title,
                sort_order AS sortOrder,
                is_visible AS isVisible,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM PortfolioSection
            WHERE portfolio_version_id = @versionId
            ORDER BY
                CASE WHEN sort_order IS NULL THEN 1 ELSE 0 END,
                sort_order ASC,
                id ASC
        `)

    return result.recordset
}

async function getSectionById(sectionId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('sectionId', sql.Int, sectionId)
        .query(`
            SELECT TOP 1
                id,
                portfolio_version_id AS versionId,
                section_type AS sectionType,
                title,
                sort_order AS sortOrder,
                is_visible AS isVisible,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM PortfolioSection
            WHERE id = @sectionId
        `)

    return result.recordset[0]
}

async function createSectionForVersion(versionId, section) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('versionId', sql.Int, versionId)
        .input('sectionType', sql.NVarChar(50), section.sectionType)
        .input('title', sql.NVarChar(100), section.title)
        .input('sortOrder', sql.Int, section.sortOrder)
        .input('isVisible', sql.Bit, section.isVisible)
        .query(`
            INSERT INTO PortfolioSection (
                portfolio_version_id,
                section_type,
                title,
                sort_order,
                is_visible,
                created_at,
                updated_at
            )
            OUTPUT
                inserted.id,
                inserted.portfolio_version_id AS versionId,
                inserted.section_type AS sectionType,
                inserted.title,
                inserted.sort_order AS sortOrder,
                inserted.is_visible AS isVisible,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            VALUES (
                @versionId,
                @sectionType,
                @title,
                @sortOrder,
                @isVisible,
                SYSUTCDATETIME(),
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function updateSection(sectionId, section) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('sectionId', sql.Int, sectionId)
        .input('sectionType', sql.NVarChar(50), section.sectionType)
        .input('title', sql.NVarChar(100), section.title)
        .input('sortOrder', sql.Int, section.sortOrder)
        .input('isVisible', sql.Bit, section.isVisible)
        .query(`
            UPDATE PortfolioSection
            SET
                section_type = @sectionType,
                title = @title,
                sort_order = @sortOrder,
                is_visible = @isVisible,
                updated_at = SYSUTCDATETIME()
            OUTPUT
                inserted.id,
                inserted.portfolio_version_id AS versionId,
                inserted.section_type AS sectionType,
                inserted.title,
                inserted.sort_order AS sortOrder,
                inserted.is_visible AS isVisible,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            WHERE id = @sectionId
        `)

    return result.recordset[0]
}

async function deleteSectionById(sectionId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('sectionId', sql.Int, sectionId)
        .query('DELETE FROM PortfolioSection WHERE id = @sectionId')
}

module.exports = {
    getSectionsByVersionId,
    getSectionById,
    createSectionForVersion,
    updateSection,
    deleteSectionById
}
