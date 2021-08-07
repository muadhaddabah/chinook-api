const { db, fields } = require("../../utils/db");
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
  AlbumController: new AlbumController(db, fields),
  ArtistController: new ArtistController(db, fields),
  CustomerController: new CustomerController(db, fields),
  EmployeeController: new EmployeeController(db, fields),
  GenreController: new GenreController(db, fields),
  InvoiceController: new InvoiceController(db, fields),
  InvoiceItemController: new InvoiceItemController(db, fields),
  mediaTypeController: new mediaTypeController(db, fields),
  PlaylistController: new PlaylistController(db, fields),
  TrackController: new TrackController(db, fields),
};
