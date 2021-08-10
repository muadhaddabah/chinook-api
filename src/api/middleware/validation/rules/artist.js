const { isEmpty, isEmail } = require("../lib/validators")
const optionalField = require("../lib/optionalField")

module.exports = {
    required: [
        "Name"
    ],
    fields: data => {
        return {
            Name: optionalField("Name", data, [
                isEmpty("Name", data.Name)
            ]),
            Email: optionalField("Email", data, [
                isEmail("Email", data.Email),
                isEmpty("Email", data.Email)
            ])
        }
    }

}