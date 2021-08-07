const BaseController = require("./BaseController");

class AlbumController extends BaseController {
  constructor(db, fields) {
    super();
    this.db = db;
    this.fields = fields;

    this.albumFields = fields.albums.join(",");
  }

  all = (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
    const stmt = this.db.prepare(`select * from albums ${orderBy}`);
    const albums = stmt.all();
    res.status(200).send(albums);
  };

  getById = (req, res) => {
    const stmt = this.db.prepare(
      `select ${this.albumFields} from albums where AlbumId = ?`
    );
    const album = stmt.get(req.params.id);
    res.send(album);
  };

  insert = (req, res) => {
    const insertFields = Object.keys(req.body);
    const insertValuesPlaceholders = insertFields
      .map((field) => `:${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `insert into albums (${insertFields.join(
        ","
      )}) values(${insertValuesPlaceholders})`
    );
    const result = stmt.run(req.body);
    res.status(201).send(result);
  };

  update = (req, res) => {
    const updateFields = Object.keys(req.body)
      .map((field) => `${field} = :${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `update albums set ${updateFields} where AlbumId = :AlbumId`
    );
    const result = stmt.run({ ...req.body, AlbumId: req.params.id });
    res.send(result);
  };

  del = (req, res) => {
    const stmt = this.db.prepare("delete from albums where AlbumId = ?");
    const result = stmt.run(req.params.id);
    res.send(result);
  };
}

module.exports = AlbumController;
