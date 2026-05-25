const sql = require('mssql')

const database = require('./database')

async function getBlocksBySectionId(sectionId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('sectionId', sql.Int, sectionId)
        .query(`
            SELECT
                id,
                section_id AS sectionId,
                block_type AS blockType,
                content_json AS contentJson,
                sort_order AS sortOrder,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM EditorBlock
            WHERE section_id = @sectionId
            ORDER BY
                CASE WHEN sort_order IS NULL THEN 1 ELSE 0 END,
                sort_order ASC,
                id ASC
        `)

    return result.recordset
}

async function getBlockById(blockId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('blockId', sql.Int, blockId)
        .query(`
            SELECT TOP 1
                id,
                section_id AS sectionId,
                block_type AS blockType,
                content_json AS contentJson,
                sort_order AS sortOrder,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM EditorBlock
            WHERE id = @blockId
        `)

    return result.recordset[0]
}

async function createBlockForSection(sectionId, block) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('sectionId', sql.Int, sectionId)
        .input('blockType', sql.NVarChar(50), block.blockType)
        .input('contentJson', sql.NVarChar(sql.MAX), block.contentJson)
        .input('sortOrder', sql.Int, block.sortOrder)
        .query(`
            INSERT INTO EditorBlock (
                section_id,
                block_type,
                content_json,
                sort_order,
                created_at,
                updated_at
            )
            OUTPUT
                inserted.id,
                inserted.section_id AS sectionId,
                inserted.block_type AS blockType,
                inserted.content_json AS contentJson,
                inserted.sort_order AS sortOrder,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            VALUES (
                @sectionId,
                @blockType,
                @contentJson,
                @sortOrder,
                SYSUTCDATETIME(),
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function updateBlock(blockId, block) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('blockId', sql.Int, blockId)
        .input('blockType', sql.NVarChar(50), block.blockType)
        .input('contentJson', sql.NVarChar(sql.MAX), block.contentJson)
        .input('sortOrder', sql.Int, block.sortOrder)
        .query(`
            UPDATE EditorBlock
            SET
                block_type = @blockType,
                content_json = @contentJson,
                sort_order = @sortOrder,
                updated_at = SYSUTCDATETIME()
            OUTPUT
                inserted.id,
                inserted.section_id AS sectionId,
                inserted.block_type AS blockType,
                inserted.content_json AS contentJson,
                inserted.sort_order AS sortOrder,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            WHERE id = @blockId
        `)

    return result.recordset[0]
}

async function deleteBlockById(blockId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('blockId', sql.Int, blockId)
        .query('DELETE FROM EditorBlock WHERE id = @blockId')
}

module.exports = {
    getBlocksBySectionId,
    getBlockById,
    createBlockForSection,
    updateBlock,
    deleteBlockById
}
