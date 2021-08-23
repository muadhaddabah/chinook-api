const Database = require("better-sqlite3");

// connection to database
const db = new Database("chinook.db", { verbose: console.log });

const capitalize = ([firstLetter, ...restOfWord]) => firstLetter.toUpperCase() + restOfWord.join('')

const tableAliasFields = (alias, fields) =>
  fields.map((f) => `${alias}.${f} as \`${alias}.${f}\``).join(",");



const tables = {

  albums: {
    pk: "AlbumId",
    alias: "Album",
    fields: ["AlbumId", "Title", "ArtistId"]
  },
  artists: {
    pk: "ArtistId",
    alias: "Artist",
    fields: ["ArtistId", "Name"]
  },
  customers: {
    pk: "CustomerId",
    alias: "Customer",
    fields: [
      "CustomerId",
      "FirstName",
      "LastName",
      "Company",
      "Address",
      "City",
      "State",
      "Country",
      "PostalCode",
      "Phone",
      "Fax",
      "Email",
      "SupportRepId",
    ]
  },
  employees: {
    pk: "EmployeeId",
    alias: "Employee",
    fields: [
      "EmployeeId",
      "FirstName",
      "LastName",
      "Title",
      "ReportsTo",
      "BirthDate",
      "HireDate",
      "Address",
      "City",
      "State",
      "Country",
      "PostalCode",
      "Phone",
      "Fax",
      "Email",
    ]
  },
  genres: {
    pk: "GenreId",
    alias: "Genre",
    fields: ["GenreId", "Name"]
  },
  invoice_items: {
    pk: "InvoiceLineId",
    alias: "Invoice_Item",
    fields: [
      "InvoiceLineId",
      "InvoiceId",
      "TrackId",
      "UnitPrice",
      "Quantity",
    ]
  },
  invoices: {
    pk: "InvoiceId",
    alias: "Invoice",
    fields: [
      "InvoiceId",
      "CustomerId",
      "InvoiceDate",
      "BillingAddress",
      "BillingCity",
      "BillingState",
      "BillingCountry",
      "BillingPostalCode",
      "Total",
    ]
  },
  media_types: {
    pk: "MediaTypeId",
    alias: "MediaType",
    fields: ["MediaTypeId", "Name"
    ]
  },
  playlists: {
    pk: "PlaylistId",
    alias: "Playlist",
    fields: ["PlaylistId", "Name"]
  },
  tracks: {
    pk: "TrackId",
    alias: "Track",
    fields: [
      "TrackId",
      "Name",
      "AlbumId",
      "MediaTypeId",
      "GenreId",
      "Composer",
      "Milliseconds",
      "Bytes",
      "UnitPrice",
    ]
  },
}

Object.keys(tables).forEach(tbl => {
  tables[tbl].aliasedFields = tableAliasFields(tables[tbl].alias, tables[tbl].fields)
})
console.log("🚀 ~ file: db.js ~ line 115 ~ Object.keys ~ tables", tables)




module.exports = { db, tables };
