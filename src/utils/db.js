const Database = require('better-sqlite3')

const db = new Database('chinook.db', {verbose: console.log})

module.exports = db