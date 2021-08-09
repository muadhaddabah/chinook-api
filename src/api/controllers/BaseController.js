class BaseController {
  constructor(db, tables, tableName) {
    this.db = db
    this.tables = tables
    this.tableName = tableName
    this.pk = tables[tableName].pk

    this.fieldsList = tables[tableName].fields.join(",");
  }

  tableAliasFields = (alias, fields) =>
    fields.map((f) => `${alias}.${f} as \`${alias}.${f}\``).join(",");

  all = (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
    const stmt = this.db.prepare(`select * from ${this.tableName} ${orderBy}`);
    const results = stmt.all();
    res.status(200).send(results);
  };

  getById = (req, res) => {
    const stmt = this.db.prepare(
      `select ${this.fieldsList} from ${this.tableName} where ${this.pk} = ?`
    );
    const result = stmt.get(req.params.id);
    res.send(result);
  };

  insert = (req, res) => {
    const insertFields = Object.keys(req.body);
    const insertValuesPlaceholders = insertFields
      .map((field) => `:${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `insert into ${this.tableName} (${insertFields.join(
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
      `update ${this.tableName} set ${updateFields} where ${this.pk} = :${this.pk}`
    );
    const result = stmt.run({ ...req.body, [this.pk]: req.params.id });
    res.send(result);
  };

  del = (req, res) => {
    const stmt = this.db.prepare(`delete from ${this.tableName} where ${this.pk} = ?`);
    const result = stmt.run(req.params.id);
    res.send(result);
  };

}

module.exports = BaseController;
