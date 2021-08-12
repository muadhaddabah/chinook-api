const { isEmpty } = require("../lib/validators")
const optionalField = require("../lib/optionalField")

module.exports = {
    required: [
        "Title",
        "ArtistId"

    ],
    fields: data => {
        return {
            Title: optionalField("Title", data, [
                isEmpty("Title", data.Title)
            ]),
            ArtistId: optionalField("ArtistId", data, [
                isEmpty("ArtistId", data.ArtistId)
            ])
        }
    }
}