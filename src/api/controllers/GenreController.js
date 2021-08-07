const BaseController = require("./BaseController");

class GenreController extends BaseController {
  constructor(db, fields) {
    super();
    this.db = db;
    this.fields = fields;

    this.genreFields = fields.genres.join(",");
  }

  all = (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
    const stmt = this.db.prepare(`select * from genres ${orderBy}`);
    const genres = stmt.all();
    res.status(200).send(genres);
  };

  getById = (req, res) => {
    const stmt = this.db.prepare(
      `select ${this.genreFields} from genres where GenreId = ?`
    );
    const artist = stmt.get(req.params.id);
    res.send(artist);
  };

  insert = (req, res) => {
    const insertFields = Object.keys(req.body);
    const insertValuesPlaceholders = insertFields
      .map((field) => `:${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `insert into genres (${insertFields.join(
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
      `update genres set ${updateFields} where GenreId = :GenreId`
    );
    const result = stmt.run({ ...req.body, GenreId: req.params.id });
    res.send(result);
  };

  del = (req, res) => {
    const stmt = this.db.prepare(`delete from genres where GenreId = ?`);
    const result = stmt.run(req.params.id);
    res.send(result);
  };
}

module.exports = GenreController;
