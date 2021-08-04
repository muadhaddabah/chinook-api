const express = require('express')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')

router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from customers ${orderBy}`)
    const customers = stmt.all()
    res.status(200).send(customers)
})

router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from customers where CustomerId = ?')
    const customer = stmt.get(req.params.id)
    res.send(customer)
})

router.post("/", (req, res) => {
    const stmt = db.prepare('insert into customers (FirstName, LastName,Company, Address, City, State, Country, PostalCode, Phone, Fax, Email, SupportRepId) values(:FirstName, :LastName,:Company, :Address, :City, :State, :Country, :PostalCode, :Phone, :Fax, :Email, :SupportRepId)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})


router.put("/:id", (req, res) => {
    const stmt = db.prepare('update customers set FirstName = :FirstName,LastName = :LastName, Company=:Company, Address=:Address, City=:City, State=:State, Country=:Country, PostalCode=:PostalCode, Phone=:Phone, Fax=:Fax, Email=:Email, SupportRepId=:SupportRepId where CustomerId = :CustomerId')
    const result = stmt.run({...req.body, CustomerId: req.params.id})
    res.send(result)
})

router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from customers where CustomerId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router