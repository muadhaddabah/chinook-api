const { groupBy, filterObjectByKey } = require("../../utils/helpers");
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

  getHistory = (req, res) => {
    try {
      const sql = `SELECT ${this.tables.customers.aliasedFields},
      ${this.tableAliasFields('Invoice', ['InvoiceId', 'InvoiceDate', 'Total'])},
      ${this.tableAliasFields('Invoice_Item', ['InvoiceLineId', 'InvoiceId', 'TrackId', 'UnitPrice'])}, count(Invoice_Item.InvoiceId) as 'Invoice_Item.Count',
      ${this.tableAliasFields('Track', ['TrackId', 'Name'])}
      from customers as Customer 
      join invoices as Invoice
      on Customer.CustomerId = Invoice.CustomerId
      join invoice_items as Invoice_Item
      on Invoice.InvoiceId = Invoice_Item.InvoiceId
      join tracks as Track
      on Invoice_item.TrackId = Track.TrackId
      Where Customer.CustomerId = ${req.params.id}
      group by Invoice_Item.InvoiceLineId`
      console.log("🚀 ~ file: CustomerController.js ~ line 43 ~ CustomerController ~ sql", sql)
      const stmt = this.db.prepare(`${sql}`)
      const queryResults = stmt.all()
      const invoicesByCustomer = queryResults && Object.values(groupBy(queryResults, "Invoice.InvoiceId"))
      console.log("🚀 ~ file: CustomerController.js ~ line 57 ~ CustomerController ~ queryResults", invoicesByCustomer)

      const results = (queryResults && queryResults.length > 0) && {
        ...filterObjectByKey(queryResults[0], "customer"),
        invoices: invoicesByCustomer.map(it => ({
          ...filterObjectByKey(it[0], "invoice"),
          invoice_items: it.map(item => ({
            ...filterObjectByKey(item, "invoice_item"),
            ...filterObjectByKey(item, "track"),
          }))
        }))
      } || {}
      res.status(200).send({ success: true, data: results, message: `${this.tableName}.all() ran` })

    } catch (error) {
      console.log("🚀 ~ file: CustomerController.js ~ line 94 ~ CustomerController ~ error", error)
      res.status(404).send({ success: false, message: error.message, error })

    }
  }

  getSalesPerCustomer = (req, res) => {
    try {
      const sql = `select ${this.tableAliasFields('Customer', ['CustomerId', 'FirstName', 'LastName'])},
      ${this.tableAliasFields('Invoice', ['InvoiceId'])},
      ${this.tableAliasFields('Invoice_Item', ['UnitPrice'])}, sum(Invoice_Item.Quantity * Invoice_Item.UnitPrice) as 'Invoice.totalSales' 
      from customers as Customer
      join invoices as Invoice
      on Customer.CustomerId = Invoice.CustomerId
      join invoice_items as Invoice_Item
      on Invoice.InvoiceId = Invoice_Item.InvoiceId
      where Customer.CustomerId = ${req.params.id}
      `
      console.log("🚀 ~ file: CustomerController.js ~ line 97 ~ CustomerController ~ sql", sql)

      const stmt = this.db.prepare(`${sql}`)
      const queryResults = stmt.all()
      console.log("🚀 ~ file: CustomerController.js ~ line 109 ~ CustomerController ~ queryResults", queryResults)

      const results = []
      let temp = {
        Invoice: {},
        Invoice_Item: {},
      }

      queryResults.forEach(customer => {
        temp = {
          Invoice: {},
          Invoice_Item: {}
        }

        Object.keys(customer).forEach(field => {
          const arr = field.split(".")

          if (arr[0].toLowerCase() === "customer") {
            temp[arr[1]] = customer[field]
          } else {
            temp[arr[0]][arr[1]] = customer[field]
          }
        })
        results.push(temp)
      });
      res.status(200).send({ success: true, data: results, message: `${this.tableName}.all() ran` })
    } catch (error) {
      console.log("🚀 ~ file: CustomerController.js ~ line 136 ~ CustomerController ~ error", error)
      res.status(404).send({ success: false, message: error.message, error })
    }
  }
}

// const invoicesByCustomer = Object.values(groupBy(queryResults, "Invoice.InvoiceId"))
// const results = {
//   CustomerId: queryResults[0]["Customer.CustomerId"],
//   FirstName: queryResults[0]["Customer.FirstName"],
//   LastName: queryResults[0]["Customer.LastName"],
// }
module.exports = CustomerController;
