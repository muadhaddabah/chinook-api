const BaseController = require("./BaseController");

class TrackController extends BaseController {
  constructor(db, fields) {
    super();
    this.db = db;
    this.fields = fields;

    this.trackFields = fields.tracks.join(",");
  }

  all = (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
    const stmt = this.db.prepare(`select * from tracks ${orderBy}`);
    const tracks = stmt.all();
    res.status(200).send(tracks);
  };

  getById = (req, res) => {
    const stmt = this.db.prepare(
      `select ${this.trackFields} from tracks where TrackId = ?`
    );
    const track = stmt.get(req.params.id);
    res.send(track);
  };

  insert = (req, res) => {
    const insertFields = Object.keys(req.body);
    const insertValuesPlaceholder = insertFields
      .map((field) => `:${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `insert into tracks (${insertFields.join(
        ","
      )}) values(${insertValuesPlaceholder})`
    );
    const result = stmt.run(req.body);
    res.status(201).send(result);
  };

  update = (req, res) => {
    const updateFields = Object.keys(req.body)
      .map((field) => `${field} = :${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `update tracks set ${updateFields} where TrackId = :TrackId`
    );
    const result = stmt.run({ ...req.body, TrackId: req.params.id });
    res.send(result);
  };

  del = (req, res) => {
    const stmt = this.db.prepare("delete from tracks where TrackId = ?");
    const result = stmt.run(req.params.id);
    res.send(result);
  };
}

module.exports = TrackController;
