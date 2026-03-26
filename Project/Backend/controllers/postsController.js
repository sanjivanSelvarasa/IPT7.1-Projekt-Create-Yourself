const postsService = require('../services/postsService')

function getPosts(req, res) {
    const posts = postsService.getPostsForUser(req.user.email)
    res.json(posts)
}

module.exports = {
    getPosts
}
