// checking to see if field exists if so apply rules
module.exports = (field, rules) => {
    if (field) {
        return rules
    }
}