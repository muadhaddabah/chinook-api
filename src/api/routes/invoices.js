const express = require('express')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')

router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from invoices ${orderBy}`)
    const invoices = stmt.all()
    res.status(200).send(invoices)
})

router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from invoices where InvoiceId = ?')
    const invoice = stmt.get(req.params.id)
    res.send(invoice)
})

// inserts a new row
router.post("/", (req, res) => {
    const stmt = db.prepare('insert into invoices (CustomerId, InvoiceDate, BillingAddress, BillingCity, BillingState, BillingCountry, BillingPostalCode, Total) values(:CustomerId, :InvoiceDate, :BillingAddress, :BillingCity, :BillingState, :BillingCountry, :BillingPostalCode, :Total)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})

// Updates row
router.put("/:id", (req, res) => {
    const stmt = db.prepare('update invoices set CustomerId = :CustomerId, InvoiceDate = :InvoiceDate, BillingAddress = :BillingAddress, BillingCity = :BillingCity, BillingState = :BillingState, BillingCountry = :BillingCountry, BillingPostalCode = :BillingPostalCode, Total = :Total  where InvoiceId = :InvoiceId')
    const result = stmt.run({...req.body, InvoiceId: req.params.id})
    res.send(result)
})

router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from invoices where InvoiceId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router