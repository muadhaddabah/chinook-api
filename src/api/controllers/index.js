const { db, tables } = require("../../utils/db");
const AlbumController = require("./AlbumController");
const ArtistController = require("./ArtistController");
const CustomerController = require("./CustomerController");
const EmployeeController = require("./EmployeeController");
const GenreController = require("./GenreController");
const InvoiceController = require("./InvoiceController");
const InvoiceItemController = require("./InvoiceItemController");
const mediaTypeController = require("./mediaTypeController");
const PlaylistController = require("./PlaylistController");
const TrackController = require("./TrackController");

module.exports = {
  AlbumController: new AlbumController(db, tables, "albums"),
  ArtistController: new ArtistController(db, tables, "artists"),
  CustomerController: new CustomerController(db, tables, "customers"),
  EmployeeController: new EmployeeController(db, tables, "employees"),
  GenreController: new GenreController(db, tables, "genres"),
  InvoiceController: new InvoiceController(db, tables, "invoices"),
  InvoiceItemController: new InvoiceItemController(db, tables, "invoice_items"),
  mediaTypeController: new mediaTypeController(db, tables, "media_types"),
  PlaylistController: new PlaylistController(db, tables, "playlists"),
  TrackController: new TrackController(db, tables, "tracks"),
};
