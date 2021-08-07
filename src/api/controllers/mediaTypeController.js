const BaseController = require("./BaseController");

class mediaTypeController extends BaseController {
  constructor(db, fields) {
    super();
    this.db = db;
    this.fields = fields;

    this.media_typesFields = fields.media_types.join(",");
  }

  all = (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
    const stmt = this.db.prepare(`select * from media_types ${orderBy}`);
    const media_types = stmt.all();
    res.status(200).send(media_types);
  };

  getById = (req, res) => {
    const stmt = this.db.prepare(
      "select * from media_types where MediaTypeId = ?"
    );
    const media_type = stmt.get(req.params.id);
    res.send(media_type);
  };

  insert = (req, res) => {
    const insertFields = Object.keys(req.body);
    const insertValuesPlaceholder = insertFields
      .map((field) => `${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `insert into media_types (${insertFields.join(
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
      `update media_types set ${updateFields} where MediaTypeId = :MediaTypeId`
    );
    const result = stmt.run({ ...req.body, MediaTypeId: req.params.id });
    res.send(result);
  };

  del = (req, res) => {
    const stmt = this.db.prepare(
      "delete from media_types where MediaTypeId = ?"
    );
    const result = stmt.run(req.params.id);
    res.send(result);
  };
}

module.exports = mediaTypeController;
