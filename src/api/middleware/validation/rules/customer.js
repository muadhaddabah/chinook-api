const { isEmpty, isEmail, isPostalCode, isMobilePhone } = require("../lib/validators")
const optionalField = require("../lib/optionalField")

module.exports = {
    required: [
        "FirstName",
        "LastName",
        "Address",
        "City",
        "State",
        "Country",
        "Phone",
        "Email"
    ],
    fields: data => {
        return {
            FirstName: optionalField("FirstName", data, [
                isEmpty("FirstName", data.FirstName)
            ]),
            LastName: optionalField("LastName", data, [
                isEmpty("LastName", data.LastName)
            ]),
            Company: optionalField("Company", data, [
                isEmpty("Company", data.Company)
            ]),
            Address: optionalField("Address", data, [
                isEmpty("Address", data.Address)
            ]),
            City: optionalField("City", data, [
                isEmpty("City", data.City)
            ]),
            State: optionalField("State", data, [
                isEmpty("State", data.State)
            ]),
            Country: optionalField("Country", data, [
                isEmpty("Country", data.Country)
            ]),
            PostalCode: optionalField("PostalCode", data, [
                isEmpty("PostalCode", data.PostalCode),
                isPostalCode("PostalCode", data.PostalCode)
            ]),
            Phone: optionalField("Phone", data, [
                isEmpty("Phone", data.Phone),
                isMobilePhone("Phone", data.Phone)
            ]),
            Fax: optionalField("Fax", data, [
                isEmpty("Fax", data.Fax)
            ]),
            Email: optionalField("Email", data, [
                isEmpty("Email", data.Email),
                isEmail("Email", data.Email)
            ]),
            SupportRepId: optionalField("SupportRepId", data, [
                isEmpty("SupportRepId", data.SupportRepId)
            ])
        }
    }
}