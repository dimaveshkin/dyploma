/**
 * check is captcha is correct
 * @param placename
 * @returns {Function}
 */
module.exports = function (placename) {
    return function (req, res, next) {
        console.log("===========================\n"+placename+" - captcha: "+req.session.captcha);
        next();
    }
};