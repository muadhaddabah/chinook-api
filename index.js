const Database = require('better-sqlite3')

const db = new Database('chinook.db', {verbose: console.log})

// const stmt = db.prepare('select *, `FirstName` || " " || `LastName` as `FullName` from customers')
const stmt = db.prepare("select *, FirstName || ' ' || LastName as FullName from customers")

const customers = stmt.all()

// clg customers fullname 
// map takes existing array and manipulates it
console.log(customers.map(customer => ({id:customer.CustomerId, email: customer.Email})));

