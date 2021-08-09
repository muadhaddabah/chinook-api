const BaseController = require("./BaseController");

class CustomerController extends BaseController {
  constructor(db, tables, tableName) {
    // have to call super since we're inheriting from base controller 
    super(db, tables, tableName);
  }

  joinInvoices = (req, res) => {
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
    res.send(invoices);
  };

  getInvoiceById = (req, res) => {
    const stmt = this.db.prepare(
      `select ${this.invoiceFields} from invoices where InvoiceId = ?`
    );
    const invoice = stmt.get(req.params.id);
    res.send(invoice);
  };
}

module.exports = CustomerController;
