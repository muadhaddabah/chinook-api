const BaseController = require("./BaseController");

class CustomerController extends BaseController {
  constructor(db, fields) {
    super();
    this.db = db;
    this.fields = fields;
    this.customerFields = fields.customers.join(",");
  }

  all = (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
    const stmt = this.db.prepare(`select * from customers ${orderBy}`);
    const customers = stmt.all();
    res.status(200).send(customers);
  };

  joinInvoices = (req, res) => {
    const sql = `select ${this.tableAliasFields(
      "Customers",
      this.fields.customers
    )}, ${this.tableAliasFields("Invoices", this.fields.invoices)} 
    from customers as Customers 
    join invoices as Invoices 
    on Customers.CustomerId = Invoices.CustomerId
    order by Customers.CustomerId`;
    const stmt = this.db.prepare(sql);
    const invoices = stmt.all();
    res.send(invoices);
  };

  getById = (req, res) => {
    const stmt = this.db.prepare(
      `select ${this.customerFields} from customers where CustomerId = ?`
    );
    const customer = stmt.get(req.params.id);
    res.send(customer);
  };

  getInvoiceById = (req, res) => {
    const stmt = this.db.prepare(
      `select ${this.invoiceFields} from invoices where InvoiceId = ?`
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
      `insert into customers (${insertFields.join(
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
      `update customers set ${updateFields} where CustomerId = :CustomerId`
    );
    const result = stmt.run({ ...req.body, CustomerId: req.params.id });
    res.send(result);
  };

  del = (req, res) => {
    const stmt = this.db.prepare("delete from customers where CustomerId = ?");
    const result = stmt.run(req.params.id);
    res.send(result);
  };
}

module.exports = CustomerController;
