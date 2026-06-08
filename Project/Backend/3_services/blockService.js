const ApiError = require('../5_utils/ApiError')
const {
    ensurePayloadObject,
    parseId,
    parseRequiredText,
    parseOptionalSortOrder
} = require('../5_utils/validators')
const { getOwnedPortfolio } = require('./helpers/portfolioAccess')
const portfolioModel = require('../4_models/portfolioModel')
const sectionModel = require('../4_models/sectionModel')
const blockModel = require('../4_models/blockModel')
const { deleteUploadedFile } = require('../5_utils/fileHelpers')

function parseBlockContentJson(contentJson) {
    if (!contentJson) return {}

    try {
        const parsed = JSON.parse(contentJson)
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
    } catch {
        return {}
    }
}

async function getOwnedSection(email, rawPortfolioId, rawVersionId, rawSectionId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const versionId = parseId(rawVersionId, 'Versions-ID')

    const version = await portfolioModel.getVersionById(versionId)
    if (!version || version.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Version nicht gefunden.')
    }

    const sectionId = parseId(rawSectionId, 'Section-ID')
    const section = await sectionModel.getSectionById(sectionId)
    if (!section || section.versionId !== version.id) {
        throw new ApiError(404, 'Section nicht gefunden.')
    }

    return { portfolio, version, section }
}

async function listBlocks(email, rawPortfolioId, rawVersionId, rawSectionId) {
    const { section } = await getOwnedSection(email, rawPortfolioId, rawVersionId, rawSectionId)
    return blockModel.getBlocksBySectionId(section.id)
}

async function createBlock(email, rawPortfolioId, rawVersionId, rawSectionId, data) {
    const { section } = await getOwnedSection(email, rawPortfolioId, rawVersionId, rawSectionId)
    ensurePayloadObject(data)

    const blockType = parseRequiredText(data.blockType, 'Block-Typ', 50)
    const sortOrder = parseOptionalSortOrder(data.sortOrder)

    let contentJson = null
    if (data.contentJson !== undefined && data.contentJson !== null) {
        try {
            contentJson = JSON.stringify(data.contentJson)
        } catch {
            throw new ApiError(400, 'contentJson muss gültiges JSON sein.')
        }
    }

    return blockModel.createBlockForSection(section.id, {
        blockType,
        contentJson,
        sortOrder
    })
}

async function updateBlock(email, rawPortfolioId, rawVersionId, rawSectionId, rawBlockId, data) {
    const { section } = await getOwnedSection(email, rawPortfolioId, rawVersionId, rawSectionId)
    const blockId = parseId(rawBlockId, 'Block-ID')
    ensurePayloadObject(data)

    const existing = await blockModel.getBlockById(blockId)
    if (!existing || existing.sectionId !== section.id) {
        throw new ApiError(404, 'Block nicht gefunden.')
    }

    const blockType = data.blockType !== undefined
        ? parseRequiredText(data.blockType, 'Block-Typ', 50)
        : existing.blockType

    const sortOrder = data.sortOrder !== undefined
        ? parseOptionalSortOrder(data.sortOrder)
        : existing.sortOrder

    let contentJson = existing.contentJson
    if (data.contentJson !== undefined) {
        if (data.contentJson === null) {
            contentJson = null
        } else {
            try {
                contentJson = JSON.stringify(data.contentJson)
            } catch {
                throw new ApiError(400, 'contentJson muss gültiges JSON sein.')
            }
        }
    }

    return blockModel.updateBlock(blockId, {
        blockType,
        contentJson,
        sortOrder
    })
}

async function deleteBlock(email, rawPortfolioId, rawVersionId, rawSectionId, rawBlockId) {
    const { section } = await getOwnedSection(email, rawPortfolioId, rawVersionId, rawSectionId)
    const blockId = parseId(rawBlockId, 'Block-ID')

    const existing = await blockModel.getBlockById(blockId)
    if (!existing || existing.sectionId !== section.id) {
        throw new ApiError(404, 'Block nicht gefunden.')
    }

    await blockModel.deleteBlockById(blockId)
}

async function uploadBlockImage(email, rawPortfolioId, rawVersionId, rawSectionId, rawBlockId, file) {
    const { section } = await getOwnedSection(email, rawPortfolioId, rawVersionId, rawSectionId)
    const blockId = parseId(rawBlockId, 'Block-ID')

    const existing = await blockModel.getBlockById(blockId)
    if (!existing || existing.sectionId !== section.id) {
        throw new ApiError(404, 'Block nicht gefunden.')
    }

    if (!file || typeof file.filename !== 'string' || file.filename.trim() === '') {
        throw new ApiError(400, 'Es wurde keine Bilddatei hochgeladen.')
    }

    const content = parseBlockContentJson(existing.contentJson)
    const oldImageUrl = typeof content.imageUrl === 'string' ? content.imageUrl : null
    content.imageUrl = `/uploads/modules/${file.filename}`

    const updated = await blockModel.updateBlock(blockId, {
        blockType: existing.blockType,
        contentJson: JSON.stringify(content),
        sortOrder: existing.sortOrder
    })

    deleteUploadedFile(oldImageUrl)

    return {
        id: updated.id,
        sectionId: updated.sectionId,
        imageUrl: content.imageUrl,
        updatedAt: updated.updatedAt
    }
}

module.exports = {
    listBlocks,
    createBlock,
    updateBlock,
    deleteBlock,
    uploadBlockImage
}
