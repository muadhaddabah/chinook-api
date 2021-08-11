const validator = require("validator")

module.exports = {
    isEmpty: (field, str = "") => validator.isEmpty(str) ? `${field} is required and cannot be empty` : null,
    isEmail: (field, str = "") => validator.isEmail(str) ? null : `${field} is not a valid email`,
    isNumeric: (field, str = "") => validator.isNumeric(str) ? null : `${field} is not a valid number`,
    isPostalCode: (field, str = "") => validator.isPostalCode(str) ? null : `${field} is not a valid Postal Code`,
    isMobilePhone: (field, str = "") => validator.isMobilePhone(str) ? null : `${field} is not a valid Postal Code`
}