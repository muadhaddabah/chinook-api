const { isEmpty, isEmail } = require("../lib/validators")
const filterErrorMessages = require("../lib/filterErrorMessages")
const optionalField = require("../lib/optionalField")

module.exports = {
    required: [
        "Name"
    ],
    fields: data => {
        return {
            Name: filterErrorMessages([
                isEmpty("Name", data.Name)
            ]),
            Email: optionalField(data.Email, filterErrorMessages([
                isEmail("Email", data.Email)
            ]))
        }
    }

}