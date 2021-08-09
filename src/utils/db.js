const Database = require("better-sqlite3");

// connection to database
const db = new Database("chinook.db", { verbose: console.log });

const tables = {
  albums: {
    pk: "AlbumId",
    fields: ["AlbumId", "Title", "ArtistId"]
  },
  artists: {
    pk: "ArtistId",
    fields: ["ArtistId", "Name"]
  },
  customers: {
    pk: "CustomerId",
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
    fields: ["GenreId", "Name"]
  },
  invoice_items: {
    pk: "InvoiceLineId",
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
    fields: ["MediaTypeId", "Name"
    ]
  },
  playlists: {
    pk: "PlaylistId",
    fields: ["PlaylistId", "Name"]
  },
  tracks: {
    pk: "TrackId",
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


module.exports = { db, fields, tables };
