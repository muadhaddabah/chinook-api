const { isEmpty, isEmail } = require("../lib/validators")
const optionalField = require("../lib/optionalField")

module.exports = {
    required: [
        "FirstName",
        "LastName",
        "ReportsTo",
        "BirthDate",
        "HireDate",
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
            Title: optionalField("Title", data, [
                isEmpty("Title", data.Title)
            ]),
            ReportsTo: optionalField("ReportsTo", data, [
                isEmpty("ReportsTo", data.ReportsTo)
            ]),
            BirthDate: optionalField("BirthDate", data, [
                isEmpty("BirthDate", data.BirthDate)
            ]),
            HireDate: optionalField("HireDate", data, [
                isEmpty("HireDate", data.HireDate)
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
                isEmpty("PostalCode", data.PostalCode)
            ]),
            Phone: optionalField("Phone", data, [
                isEmpty("Phone", data.Phone)
            ]),
            Fax: optionalField("Fax", data, [
                isEmpty("Fax", data.Fax)
            ]),
            Email: optionalField("Email", data, [
                isEmpty("Email", data.Email),
                isEmail("Email", data.Email)
            ]),

        }
    }

}