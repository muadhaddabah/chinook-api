const BaseController = require("./BaseController");

class CustomerController extends BaseController {
  constructor(db, tables, tableName) {
    // have to call super since we're inheriting from base controller 
    super(db, tables, tableName);
  }

  joinInvoices = (req, res) => {
    try {
      const sql = `select ${this.tableAliasFields(
        "Customers",
        this.tables.customers.fields
      )}, ${this.tableAliasFields("Invoices", this.tables.invoices.fields)}
    from customers as Customers 
    join invoices as Invoices 
    on Customers.CustomerId = Invoices.CustomerId
    order by Customers.CustomerId`;
      const stmt = this.db.prepare(sql);
      const invoices = stmt.all();
      res.status(200).send({ success: true, data: invoices, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  };

  getInvoiceById = (req, res) => {
    try {
      const stmt = this.db.prepare(
        `select ${this.invoiceFields} from invoices where InvoiceId = ?`
      );
      const invoice = stmt.get(req.params.id);
      res.status(200).send({ success: true, data: invoice, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  };
}

module.exports = CustomerController;
