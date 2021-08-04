const express = require('express')
const {tableAliasFields} = require('../../utils/helpers')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')
const fields = ['EmployeeId', 'FirstName', 'LastName','Title', 'ReportsTo', 'BirthDate', 'HireDate', 'Address', 'City', 'State', 'Country', 'PostalCode', 'Phone', 'Fax', 'Email' ]
const employeeFields = fields.join(",")
//aliasing Employees.EmployeeId as `Employees.EmployeeId`

router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from employees ${orderBy}`)
    const employees = stmt.all()
    res.status(200).send(employees)
})

// needs to be before /:id so itll be matched first
router.get("/staff", (req, res) => {
    const sql = `select ${tableAliasFields('Employees', fields)}, ${tableAliasFields('Managers', fields)} from employees as Employees join employees as Managers on Employees.ReportsTo = Managers.EmployeeId order by Managers.EmployeeId` 
    const stmt = db.prepare(sql)
    const staff = stmt.all()
    res.send(staff)
})

router.get("/:id", (req, res) => {
    const stmt = db.prepare(`select ${employeeFields} from employees where EmployeeId = ?`)
    const employee = stmt.get(req.params.id)
    res.send(employee)
})

router.get("/:id/staff", (req, res) => {
    const sql = `select ${employeeFields} from employees where ReportsTo = ?`
    const stmt = db.prepare(sql)
    const staff = stmt.all(req.params.id)
    res.send(staff)
})

router.get("/:id/customers", (req, res) => {
    const stmt = db.prepare('select * from customers where SupportRepId = ?')
    const customers = stmt.get(req.params.id)
    res.send(customers)
})

router.post("/", (req, res) => {
    const stmt = db.prepare('insert into employees (FirstName, LastName,Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email) values(:FirstName,:LastName,:Title,:ReportsTo,:BirthDate,:HireDate, :Address, :City, :State, :Country, :PostalCode, :Phone, :Fax, :Email)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})


router.put("/:id", (req, res) => {
    const stmt = db.prepare('update employees set LastName = :LastName, FirstName = :FirstName, Title = :Title, ReportsTo = :ReportsTo, BirthDate = :BirthDate, HireDate = :HireDate, Address=:Address, City=:City, State=:State, Country=:Country, PostalCode=:PostalCode, Phone=:Phone, Fax=:Fax, Email=:Email where EmployeeId = :EmployeeId')
    const result = stmt.run({...req.body, EmployeeId: req.params.id})
    res.send(result)
})

router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from employees where EmployeeId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router