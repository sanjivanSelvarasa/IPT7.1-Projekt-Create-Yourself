const postsModel = require('../models/postsModel')

function getPostsForUser(email) {
    return postsModel.getPostsByEmail(email)
}

module.exports = {
    getPostsForUser
}
