const { isEmpty, isEmail } = require("../lib/validators")
const filterErrorMessages = require("../lib/filterErrorMessages")
const fieldExists = require("../lib/fieldExists")

module.exports = {
    required: [
        "Name"
    ],
    fields: data => {
        return {
            Name: filterErrorMessages([
                isEmpty("Name", data.Name)
            ]),
            Email: fieldExists(data.Email, filterErrorMessages([
                isEmail("Email", data.Email)
            ]))
        }
    }

}