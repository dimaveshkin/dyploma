const SOURCE = "/images/gallery/";

module.exports = function (obj, field) {

    if(!field) {
        field = 'src';
    }

    for (var i = 0, length = obj.length; i < length; i++) {
        obj[i][field] = SOURCE + obj[i][field];
    }

    return obj;
};