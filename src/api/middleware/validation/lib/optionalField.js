const filterErrorMessages = require("./filterErrorMessages")

// checking to see if field exists if so apply rules
module.exports = (field, data, rules) => {
    if (data.hasOwnProperty(field)) {
        return filterErrorMessages(rules)
    }
}