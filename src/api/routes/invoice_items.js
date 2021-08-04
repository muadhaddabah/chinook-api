const express = require('express')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')

router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from invoice_items ${orderBy}`)
    const invoice_items = stmt.all()
    res.status(200).send(invoice_items)
})

router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from invoice_items where InvoiceLineId = ?')
    const invoice_item = stmt.get(req.params.id)
    res.send(invoice_item)
})

// inserts a new row
router.post("/", (req, res) => {
    const stmt = db.prepare('insert into invoice_items (InvoiceId, TrackId, UnitPrice, Quantity) values(:InvoiceId, :TrackId, :UnitPrice, :Quantity)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})

// Updates row
router.put("/:id", (req, res) => {
    const stmt = db.prepare('update invoice_items set InvoiceId = :InvoiceId, TrackId = :TrackId, UnitPrice = :UnitPrice, Quantity = :Quantity  where InvoiceLineId = :InvoiceLineId')
    const result = stmt.run({...req.body, InvoiceLineId: req.params.id})
    res.send(result)
})

router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from invoice_items where InvoiceLineId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router