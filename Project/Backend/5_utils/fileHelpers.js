const fs = require('fs')
const path = require('path')

/**
 * Deletes a file that was previously uploaded via multer.
 * Expects the URL path as stored in the database, e.g. "/uploads/projects/abc.jpg".
 * Only deletes paths that start with /uploads/ to prevent accidental deletions.
 * Errors are silently ignored (e.g. file already deleted).
 */
function deleteUploadedFile(urlPath) {
    if (!urlPath || typeof urlPath !== 'string') return
    if (!urlPath.startsWith('/uploads/')) return
    const absolutePath = path.join(__dirname, '..', urlPath.slice(1))
    fs.unlink(absolutePath, () => {})
}

module.exports = { deleteUploadedFile }
