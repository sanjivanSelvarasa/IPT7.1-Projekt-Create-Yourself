const bcrypt = require('bcrypt')

const ApiError = require('../5_utils/ApiError')
const accountModel = require('../4_models/accountModel')
const {
    ensurePayloadObject,
    parseRequiredText,
    parseOptionalText,
    parseLanguageCode
} = require('../5_utils/validators')
const { parseEmail } = require('../5_utils/authParsers')
const { deleteUploadedFile } = require('../5_utils/fileHelpers')

const NEW_PASSWORD_MIN_LENGTH = 8
const NEW_PASSWORD_MAX_LENGTH = 50

async function findUserOrThrow(email) {
    const user = await accountModel.getProfileByEmail(email)
    if (!user) {
        throw new ApiError(404, 'Benutzer nicht gefunden.')
    }
    return user
}

async function getProfile(email) {
    return findUserOrThrow(email)
}

async function updateProfile(email, data) {
    ensurePayloadObject(data)
    const user = await findUserOrThrow(email)

    const firstName = data.first_name !== undefined
        ? parseOptionalText(data.first_name, 'Vorname', 50)
        : user.firstName
    const lastName = data.last_name !== undefined
        ? parseOptionalText(data.last_name, 'Nachname', 50)
        : user.lastName
    const username = data.username !== undefined
        ? parseRequiredText(data.username, 'Benutzername', 50)
        : user.username
    const newEmail = data.email !== undefined
        ? parseEmail(data.email)
        : user.email
    const bio = data.bio !== undefined
        ? parseOptionalText(data.bio, 'Bio', 220)
        : user.bio

    if (newEmail !== user.email && await accountModel.isEmailTakenByOther(newEmail, user.id)) {
        throw new ApiError(409, 'Diese E-Mail-Adresse ist bereits vergeben.')
    }

    if (username !== user.username && await accountModel.isUsernameTakenByOther(username, user.id)) {
        throw new ApiError(409, 'Dieser Benutzername ist bereits vergeben.')
    }

    try {
        return await accountModel.updateProfile(user.id, { firstName, lastName, username, email: newEmail, bio })
    } catch (error) {
        if (error.number === 2627 || error.number === 2601) {
            throw new ApiError(409, 'E-Mail oder Benutzername ist bereits vergeben.')
        }
        throw error
    }
}

async function changePassword(email, data) {
    ensurePayloadObject(data)

    const { current_password, new_password, confirm_password } = data

    if (typeof current_password !== 'string' || current_password.trim() === '') {
        throw new ApiError(400, 'Aktuelles Passwort ist erforderlich.')
    }
    if (typeof new_password !== 'string') {
        throw new ApiError(400, 'Neues Passwort ist erforderlich.')
    }
    if (new_password.length < NEW_PASSWORD_MIN_LENGTH || new_password.length > NEW_PASSWORD_MAX_LENGTH) {
        throw new ApiError(400, `Neues Passwort muss zwischen ${NEW_PASSWORD_MIN_LENGTH} und ${NEW_PASSWORD_MAX_LENGTH} Zeichen lang sein.`)
    }
    if (new_password !== confirm_password) {
        throw new ApiError(400, 'Passwortbestätigung stimmt nicht überein.')
    }

    const userWithPw = await accountModel.findUserWithPasswordByEmail(email)
    if (!userWithPw) {
        throw new ApiError(404, 'Benutzer nicht gefunden.')
    }

    const isCurrentValid = await bcrypt.compare(current_password, userWithPw.passwordHash)
    if (!isCurrentValid) {
        throw new ApiError(401, 'Aktuelles Passwort ist falsch.')
    }

    const newHash = await bcrypt.hash(new_password, 10)
    await accountModel.updatePassword(userWithPw.id, newHash)
}

async function changeLanguage(email, data) {
    ensurePayloadObject(data)
    const user = await findUserOrThrow(email)
    const languageCode = parseLanguageCode(data.language_code ?? data.languageCode, 'Sprachcode')
    return accountModel.updateLanguage(user.id, languageCode)
}

async function deleteAccount(email) {
    const user = await findUserOrThrow(email)
    const projectImages = await accountModel.getProjectImageUrlsByUserId(user.id)
    const skillImages = await accountModel.getSkillImageUrlsByUserId(user.id)
    const experienceImages = await accountModel.getExperienceImageUrlsByUserId(user.id)
    await accountModel.deleteUserCascade(user.id)
    deleteUploadedFile(user.profileImg)
    for (const { imageUrl } of projectImages) {
        deleteUploadedFile(imageUrl)
    }
    for (const { imageUrl } of skillImages) {
        deleteUploadedFile(imageUrl)
    }
    for (const { imageUrl } of experienceImages) {
        deleteUploadedFile(imageUrl)
    }
}

async function updateProfilePicture(email, filename) {
    const user = await findUserOrThrow(email)
    const relativePath = `/uploads/profiles/${filename}`
    const result = await accountModel.updateProfilePicture(user.id, relativePath)
    deleteUploadedFile(user.profileImg)
    return result
}

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
    changeLanguage,
    deleteAccount,
    updateProfilePicture
}
