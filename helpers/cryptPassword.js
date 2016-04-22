var crypto = require('crypto');

module.exports = function (password) {
    return crypto.createHmac('sha1', 'SALT').update(password).digest('hex');
};