var crypto = require('crypto');

/**
 * crypt password to sha1
 * @param password
 * @returns {*}
 */
module.exports = function (password) {
    return crypto.createHmac('sha1', 'SALT').update(password).digest('hex');
};