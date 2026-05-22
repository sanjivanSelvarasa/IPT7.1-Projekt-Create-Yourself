const express = require('express')

const accountController = require('../2_controllers/accountController')
const authenticateToken = require('../1_middleware/authenticateToken')
const uploadProfilePicture = require('../1_middleware/uploadProfilePicture')
const asyncHandler = require('../5_utils/asyncHandler')

const router = express.Router()

// Profil lesen
router.get('/account/profile', authenticateToken, asyncHandler(accountController.getProfile))

// Profil aktualisieren
router.put('/account/profile', authenticateToken, asyncHandler(accountController.updateProfile))

// Profilbild hochladen
router.post('/account/profile/picture', authenticateToken, uploadProfilePicture.single('image'), asyncHandler(accountController.uploadProfilePicture))

// Sprache setzen/aktualisieren
router.put('/account/language', authenticateToken, asyncHandler(accountController.changeLanguage))

// Passwort ändern
router.put('/account/password', authenticateToken, asyncHandler(accountController.changePassword))

// Account löschen
router.delete('/account', authenticateToken, asyncHandler(accountController.deleteAccount))

module.exports = router
