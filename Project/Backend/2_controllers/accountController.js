const accountService = require('../3_services/accountService')

async function getProfile(req, res) {
    const profile = await accountService.getProfile(req.user.email)
    res.json(profile)
}

async function updateProfile(req, res) {
    const profile = await accountService.updateProfile(req.user.email, req.body)
    res.json(profile)
}

async function changePassword(req, res) {
    await accountService.changePassword(req.user.email, req.body)
    res.json({ message: 'Passwort erfolgreich geändert.' })
}

async function changeLanguage(req, res) {
    const result = await accountService.changeLanguage(req.user.email, req.body)
    res.json(result)
}

async function deleteAccount(req, res) {
    await accountService.deleteAccount(req.user.email)
    res.json({ message: 'Account erfolgreich gelöscht.' })
}

async function uploadProfilePicture(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: 'Kein Bild hochgeladen.' })
    }
    const result = await accountService.updateProfilePicture(req.user.email, req.file.filename)
    res.json(result)
}

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
    changeLanguage,
    deleteAccount,
    uploadProfilePicture
}
