const { isEmpty } = require("../lib/validators")
const optionalField = require("../lib/optionalField")

module.exports = {
    required: [
        "InvoiceId",
        "TrackId",
        "UnitPrice",
        "Quantity"
    ],
    fields: data => {
        return {
            InvoiceId: optionalField("InvoiceId", data, [
                isEmpty("InvoiceId", data.InvoiceId)
            ]),
            TrackId: optionalField("TrackId", data, [
                isEmpty("TrackId", data.TrackId)
            ]),
            UnitPrice: optionalField("UnitPrice", data, [
                isEmpty("UnitPrice", data.UnitPrice)
            ]),
            Quantity: optionalField("Quantity", data, [
                isEmpty("Quantity", data.Quantity)
            ]),
        }
    }
}