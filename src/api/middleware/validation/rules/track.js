const { isEmpty } = require("../lib/validators")
const optionalField = require("../lib/optionalField")

module.exports = {
    required: [
        "Name",
        "AlbumId",
        "MediaTypeId",
        "GenreId",
        "Composer",
        "Milliseconds",
        "Bytes",
        "UnitPrice"
    ],
    fields: data => {
        return {
            Name: optionalField("Name", data, [
                isEmpty("Name", data.Name)
            ]),
            AlbumId: optionalField("AlbumId", data, [
                isEmpty("AlbumId", data.AlbumId)
            ]),
            MediaTypeId: optionalField("MediaTypeId", data, [
                isEmpty("MediaTypeId", data.MediaTypeId)
            ]),
            GenreId: optionalField("GenreId", data, [
                isEmpty("GenreId", data.GenreId)
            ]),
            Composer: optionalField("Composer", data, [
                isEmpty("Composer", data.Composer)
            ]),
            Milliseconds: optionalField("Milliseconds", data, [
                isEmpty("Milliseconds", data.Milliseconds)
            ]),
            Bytes: optionalField("Bytes", data, [
                isEmpty("Bytes", data.Bytes)
            ]),
            UnitPrice: optionalField("UnitPrice", data, [
                isEmpty("UnitPrice", data.UnitPrice)
            ])
        }
    }

}