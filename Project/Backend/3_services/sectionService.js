const ApiError = require('../5_utils/ApiError')
const {
    ensurePayloadObject,
    parseId,
    parseRequiredText,
    parseOptionalText,
    parseOptionalSortOrder
} = require('../5_utils/validators')
const { getOwnedPortfolio } = require('./helpers/portfolioAccess')
const portfolioModel = require('../4_models/portfolioModel')
const sectionModel = require('../4_models/sectionModel')

async function getOwnedVersion(email, rawPortfolioId, rawVersionId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const versionId = parseId(rawVersionId, 'Versions-ID')

    const version = await portfolioModel.getVersionById(versionId)
    if (!version || version.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Version nicht gefunden.')
    }

    return { portfolio, version }
}

async function listSections(email, rawPortfolioId, rawVersionId) {
    const { version } = await getOwnedVersion(email, rawPortfolioId, rawVersionId)
    return sectionModel.getSectionsByVersionId(version.id)
}

async function createSection(email, rawPortfolioId, rawVersionId, data) {
    const { version } = await getOwnedVersion(email, rawPortfolioId, rawVersionId)
    ensurePayloadObject(data)

    const sectionType = parseRequiredText(data.sectionType, 'Section-Typ', 50)
    const title = parseOptionalText(data.title, 'Titel', 100)
    const sortOrder = parseOptionalSortOrder(data.sortOrder)
    const isVisible = data.isVisible !== undefined ? Boolean(data.isVisible) : true

    return sectionModel.createSectionForVersion(version.id, {
        sectionType,
        title,
        sortOrder,
        isVisible
    })
}

async function updateSection(email, rawPortfolioId, rawVersionId, rawSectionId, data) {
    const { version } = await getOwnedVersion(email, rawPortfolioId, rawVersionId)
    const sectionId = parseId(rawSectionId, 'Section-ID')
    ensurePayloadObject(data)

    const existing = await sectionModel.getSectionById(sectionId)
    if (!existing || existing.versionId !== version.id) {
        throw new ApiError(404, 'Section nicht gefunden.')
    }

    const sectionType = data.sectionType !== undefined
        ? parseRequiredText(data.sectionType, 'Section-Typ', 50)
        : existing.sectionType
    const title = data.title !== undefined
        ? parseOptionalText(data.title, 'Titel', 100)
        : existing.title
    const sortOrder = data.sortOrder !== undefined
        ? parseOptionalSortOrder(data.sortOrder)
        : existing.sortOrder
    const isVisible = data.isVisible !== undefined
        ? Boolean(data.isVisible)
        : existing.isVisible

    return sectionModel.updateSection(sectionId, {
        sectionType,
        title,
        sortOrder,
        isVisible
    })
}

async function deleteSection(email, rawPortfolioId, rawVersionId, rawSectionId) {
    const { version } = await getOwnedVersion(email, rawPortfolioId, rawVersionId)
    const sectionId = parseId(rawSectionId, 'Section-ID')

    const existing = await sectionModel.getSectionById(sectionId)
    if (!existing || existing.versionId !== version.id) {
        throw new ApiError(404, 'Section nicht gefunden.')
    }

    await sectionModel.deleteSectionById(sectionId)
}

module.exports = {
    listSections,
    createSection,
    updateSection,
    deleteSection
}
