const BaseController = require("./BaseController");

class InvoiceController extends BaseController {
  constructor(db, tables, tableName) {
    // have to call super since we're inheriting from base controller 
    super(db, tables, tableName);
  }

  joinInvoiceItems = (req, res) => {
    const sql = `select ${this.tableAliasFields(
      "Invoices",
      this.tables.invoices.fields
    )} , ${this.tableAliasFields("Invoice_items", this.tables.invoice_items.fields)}
    from invoices as Invoices
    join invoice_items as Invoice_items 
    on Invoices.InvoiceId = Invoice_items.InvoiceId
    order by Invoices.InvoiceId`;
    const stmt = this.db.prepare(sql);
    const invoice_items = stmt.all();
    res.send(invoice_items);
  };

  getInvoiceItemById = (req, res) => {
    const stmt = this.db.prepare(
      "select * from invoice_items where InvoiceLineId = ?"
    );
    const invoice = stmt.get(req.params.id);
    res.send(invoice);
  };

}

module.exports = InvoiceController;
