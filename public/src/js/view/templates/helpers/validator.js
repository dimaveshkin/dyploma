var validator = function (field, type) {
    var regExps = {
        email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
        text: /^.{3,}$/im
    };

    if (regExps[type].test(field.val())) {
        field.removeClass('error').addClass('js-valid');
        return true
    }
    else {
        field.removeClass('js-valid').addClass('error');
        return false;
    }
};

module.exports = validator;