const BaseController = require("./BaseController");

class PlaylistController extends BaseController {
  constructor(db, fields) {
    super();
    this.db = db;
    this.fields = fields;

    this.playlistFields = fields.playlists.join(",");
  }

  getAll = (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
    const stmt = this.db.prepare(`select * from playlists ${orderBy}`);
    const playlists = stmt.all();
    res.status(200).send(playlists);
  };

  getById = (req, res) => {
    const stmt = this.db.prepare(
      `select ${this.playlistFields} from playlists where PlaylistId = ?`
    );
    const playlist = stmt.get(req.params.id);
    res.send(playlist);
  };

  insert = (req, res) => {
    const insertFields = Object.keys(req.body);
    const insertValuesPlaceholders = insertFields
      .map((field) => `:${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `insert into playlists (${insertFields.join(
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
      `update playlists set ${updateFields} where PlaylistId = :PlaylistId`
    );
    const result = stmt.run({ ...req.body, PlaylistId: req.params.id });
    res.send(result);
  };

  del = (req, res) => {
    const stmt = this.db.prepare("delete from playlists where PlaylistId = ?");
    const result = stmt.run(req.params.id);
    res.send(result);
  };
}

module.exports = PlaylistController;
