const BaseController = require("./BaseController");

class InvoiceItemController extends BaseController {
  constructor(db, fields) {
    super();
    this.db = db;
    this.fields = fields;

    this.invoice_itemsFields = fields.invoice_items.join(",");
  }

  all = (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
    const stmt = this.db.prepare(`select * from invoice_items ${orderBy}`);
    const invoice_items = stmt.all();
    res.status(200).send(invoice_items);
  };

  joinTracks = (req, res) => {
    const sql = `select ${this.tableAliasFields(
      "Invoice_items",
      this.fields.invoice_items
    )}, ${this.tableAliasFields("Tracks", this.fields.tracks)} 
    from invoice_items as Invoice_items
    join tracks as Tracks
    on Invoice_items.TrackId = Tracks.TrackId
    order by Invoice_items.TrackId`;
    const stmt = this.db.prepare(sql);
    const tracks = stmt.all();
    res.send(tracks);
  };

  getById = (req, res) => {
    const stmt = this.db.prepare(
      `select ${this.invoice_itemsFields} from invoice_items where InvoiceLineId = ?`
    );
    const invoice_item = stmt.get(req.params.id);
    res.send(invoice_item);
  };

  getTrackByPk = (req, res) => {
    const stmt = this.db.prepare("select * from tracks where trackId = ?");
    const track = stmt.get(req.params.id);
    res.send(track);
  };

  insert = (req, res) => {
    const insertFields = Object.keys(req.body);
    const insertValuesPlaceholders = insertFields.map(
      (field) => `:${field}`,
      join(",")
    );
    const stmt = this.db.prepare(
      `insert into invoice_items (${insertFields.join(
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
      `update invoice_items set ${updateFields} where InvoiceLineId = :InvoiceLineId`
    );
    const result = stmt.run({ ...req.body, InvoiceLineId: req.params.id });
    res.send(result);
  };

  del = (req, res) => {
    const stmt = this.db.prepare(
      "delete from invoice_items where InvoiceLineId = ?"
    );
    const result = stmt.run(req.params.id);
    res.send(result);
  };
}

module.exports = InvoiceItemController;
