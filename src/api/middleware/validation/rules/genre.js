const { isEmpty } = require("../lib/validators")
const optionalField = require("../lib/optionalField")

module.exports = {
    required: [
        "Name"
    ],
    fields: data => {
        return {
            Name: optionalField("Name", data, [
                isEmpty("Name", data.Name)
            ])
        }
    }
}