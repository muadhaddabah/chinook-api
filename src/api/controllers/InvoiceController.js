const BaseController = require("./BaseController");

class InvoiceController extends BaseController {
  constructor(db, fields) {
    super();
    this.db = db;
    this.fields = fields;

    this.invoiceFields = fields.invoices.join(",");
  }

  all = (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
    const stmt = this.db.prepare(`select * from invoices ${orderBy}`);
    const invoices = stmt.all();
    res.status(200).send(invoices);
  };

  joinInvoiceItems = (req, res) => {
    const sql = `select ${this.tableAliasFields(
      "Invoices",
      this.fields.invoices
    )} , ${this.tableAliasFields("Invoice_items", this.fields.invoice_items)}
    from invoices as Invoices
    join invoice_items as Invoice_items 
    on Invoices.InvoiceId = Invoice_items.InvoiceId
    order by Invoices.InvoiceId`;
    const stmt = this.db.prepare(sql);
    const invoice_items = stmt.all();
    res.send(invoice_items);
  };

  getById = (req, res) => {
    const stmt = this.db.prepare(
      `select ${this.invoiceFields} from invoices where InvoiceId = ?`
    );
    const invoice = stmt.get(req.params.id);
    res.send(invoice);
  };

  getInvoiceItemById = (req, res) => {
    const stmt = this.db.prepare(
      "select * from invoice_items where InvoiceLineId = ?"
    );
    const invoice = stmt.get(req.params.id);
    res.send(invoice);
  };

  insert = (req, res) => {
    const insertFields = Object.keys(req.body);
    const insertValuesPlaceholders = insertFields
      .map((field) => `:${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `insert into invoices (${insertFields.join(
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
      `update invoices set ${updateFields}  where InvoiceId = :InvoiceId`
    );
    const result = stmt.run({ ...req.body, InvoiceId: req.params.id });
    res.send(result);
  };

  del = (req, res) => {
    const stmt = this.db.prepare("delete from invoices where InvoiceId = ?");
    const result = stmt.run(req.params.id);
    res.send(result);
  };
}

module.exports = InvoiceController;
