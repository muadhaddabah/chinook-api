const express = require('express')
const {tableAliasFields} = require('../../utils/helpers')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')
// invoice_items fields
const fields = ['InvoiceLineId', 'InvoiceId', 'TrackId', 'UnitPrice', 'Quantity']
// add invoices fields
const invoiceFields = ['InvoiceId', 'CustomerId', 'InvoiceDate', 'BillingAddress', 'BillingCity', 'BillingState', 'BillingCountry', 'BillingPostalCode', 'Total']
const tracksFields = ['TrackId', 'Name', 'AlbumId', 'MediaTypeId', 'GenreId', 'Composer', 'Milliseconds', 'Bytes', 'UnitPrice']

//1-2 get * from invoice_items - returns all; .all
router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from invoice_items ${orderBy}`)
    const invoice_items = stmt.all()
    res.status(200).send(invoice_items)
})

//3 Joining invoices with Invoice_Items
router.get("/invoices", (req, res) => {
    const sql = `select ${tableAliasFields('Invoice_items', fields)}, ${tableAliasFields('Invoices', invoiceFields)} 
    from invoice_items as Invoice_items 
    join invoices as Invoices 
    on Invoice_items.InvoiceId = Invoices.InvoiceId
    order by Invoice_items.InvoiceId` 
    const stmt = db.prepare(sql)
    const invoices = stmt.all()
    res.send(invoices)
})

//3.5 Joining tracks with Invoice_Items
router.get("/tracks", (req, res) => {
    const sql = `select ${tableAliasFields('Invoice_items', fields)}, ${tableAliasFields('Tracks', tracksFields)} 
    from invoice_items as Invoice_items
    join tracks as Tracks
    on Invoice_items.TrackId = Tracks.TrackId
    order by Invoice_items.TrackId` 
    const stmt = db.prepare(sql)
    const tracks = stmt.all()
    res.send(tracks)
})

//4 GETS specified invoice item by id
router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from invoice_items where InvoiceLineId = ?')
    const invoice_item = stmt.get(req.params.id)
    res.send(invoice_item)
})

//5 specified invoice by :id
router.get("/:id/invoices", (req, res) => {
    const stmt = db.prepare('select * from invoices where InvoiceId = ?')
    const invoice = stmt.get(req.params.id)
    res.send(invoice)
})

//5.5 specified tracks by :id
router.get("/:id/tracks", (req, res) => {
    const stmt = db.prepare('select * from tracks where trackId = ?')
    const track = stmt.get(req.params.id)
    res.send(track)
})

//6 inserts a new row
router.post("/", (req, res) => {
    const stmt = db.prepare('insert into invoice_items (InvoiceId, TrackId, UnitPrice, Quantity) values(:InvoiceId, :TrackId, :UnitPrice, :Quantity)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})

//7 Updates row
router.put("/:id", (req, res) => {
    const stmt = db.prepare('update invoice_items set InvoiceId = :InvoiceId, TrackId = :TrackId, UnitPrice = :UnitPrice, Quantity = :Quantity  where InvoiceLineId = :InvoiceLineId')
    const result = stmt.run({...req.body, InvoiceLineId: req.params.id})
    res.send(result)
})

//8 DELETE
router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from invoice_items where InvoiceLineId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router