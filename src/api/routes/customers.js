const express = require('express')
// imported database instance
const db = require('../../utils/db')
const {tableAliasFields} = require('../../utils/helpers')
const router = express.Router()

const fields = ['CustomerId','FirstName', 'LastName','Company', 'Address', 'City', 'State', 'Country', 'PostalCode', 'Phone', 'Fax', 'Email', 'SupportRepId']
const invoiceFields = ['InvoiceId','CustomerId', 'InvoiceDate', 'BillingAddress', 'BillingCity', 'BillingState', 'BillingCountry', 'BillingPostalCode', 'Total']

// 1-2 GET * from customers and returns .all || optional sort
router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from customers ${orderBy}`)
    const customers = stmt.all()
    res.status(200).send(customers)
})

//3 joining invoices with customers and renaming fields with tAF function (helper)
router.get("/invoices", (req, res) => {
    const sql = `select ${tableAliasFields('Customers', fields)}, ${tableAliasFields('Invoices', invoiceFields)} 
    from customers as Customers 
    join invoices as Invoices 
    on Customers.CustomerId = Invoices.CustomerId
    order by Customers.CustomerId` 
    const stmt = db.prepare(sql)
    const invoices = stmt.all()
    res.send(invoices)
})

// 4 Returns specified customer by :id
router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from customers where CustomerId = ?')
    const customer = stmt.get(req.params.id)
    res.send(customer)
})

//5 specified invoice by :id
router.get("/:id/invoices", (req, res) => {
    const stmt = db.prepare('select * from invoices where InvoiceId = ?')
    const invoice = stmt.get(req.params.id)
    res.send(invoice)
})

//6 Inserts row into Customers
router.post("/", (req, res) => {
    const stmt = db.prepare('insert into customers (FirstName, LastName,Company, Address, City, State, Country, PostalCode, Phone, Fax, Email, SupportRepId) values(:FirstName, :LastName,:Company, :Address, :City, :State, :Country, :PostalCode, :Phone, :Fax, :Email, :SupportRepId)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})

//7 Updates by :id
router.put("/:id", (req, res) => {
    const stmt = db.prepare('update customers set FirstName = :FirstName,LastName = :LastName, Company=:Company, Address=:Address, City=:City, State=:State, Country=:Country, PostalCode=:PostalCode, Phone=:Phone, Fax=:Fax, Email=:Email, SupportRepId=:SupportRepId where CustomerId = :CustomerId')
    const result = stmt.run({...req.body, CustomerId: req.params.id})
    res.send(result)
})

//8 DELETES
router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from customers where CustomerId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router