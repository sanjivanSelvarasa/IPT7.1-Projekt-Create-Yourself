const express = require('express')

const postsController = require('../controllers/postsController')
const authenticateToken = require('../middleware/authenticateToken')

const router = express.Router()

router.get('/posts', authenticateToken, postsController.getPosts)

module.exports = router
