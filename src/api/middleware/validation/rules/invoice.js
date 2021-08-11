const { isEmpty } = require("../lib/validators")
const optionalField = require("../lib/optionalField")

module.exports = {
    required: [
        "CustomerId",
        "InvoiceDate",
        "BillingAddress",
        "BillingCity",
        "BillingState",
        "BillingCountry",
        "BillingPostalCode",
        "Total"
    ],
    fields: data => {
        return {
            CustomerId: optionalField("CustomerId", data, [
                isEmpty("CustomerId", data.CustomerId)
            ]),
            InvoiceDate: optionalField("InvoiceDate", data, [
                isEmpty("InvoiceDate", data.InvoiceDate)
            ]),
            BillingAddress: optionalField("BillingAddress", data, [
                isEmpty("BillingAddress", data.BillingAddress)
            ]),
            BillingCity: optionalField("BillingCity", data, [
                isEmpty("BillingCity", data.BillingCity)
            ]),
            BillingState: optionalField("BillingState", data, [
                isEmpty("BillingState", data.BillingState)
            ]),
            BillingCountry: optionalField("BillingCountry", data, [
                isEmpty("BillingCountry", data.BillingCountry)
            ]),
            BillingPostalCode: optionalField("BillingPostalCode", data, [
                isEmpty("BillingPostalCode", data.BillingPostalCode)
            ]),
            Total: optionalField("Total", data, [
                isEmpty("Total", data.Total)
            ])
        }
    }
}