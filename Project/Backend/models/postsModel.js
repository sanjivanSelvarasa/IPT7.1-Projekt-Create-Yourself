const posts = [
    {
        email: 'gian@example.com',
        content: 'Post 1'
    },
    {
        email: 'egor@example.com',
        content: 'Post 2'
    }
] // TODO: replace with SQL storage

function getPostsByEmail(email) {
    return posts.filter(post => post.email === email)
}

module.exports = {
    getPostsByEmail
}
