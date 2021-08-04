
const express = require('express')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')

router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from genres ${orderBy}`)
    const genres = stmt.all()
    res.status(200).send(genres)
})

router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from genres where GenreId = ?')
    const artist = stmt.get(req.params.id)
    res.send(artist)
})

// inserts new row
router.post("/", (req, res) => {
    const stmt = db.prepare('insert into genres (Name) values(:Name)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})

// Updates row
router.put("/:id", (req, res) => {
    const stmt = db.prepare('update genres set Name = :Name where GenreId = :GenreId')
    const result = stmt.run({...req.body, GenreId: req.params.id})
    res.send(result)
})

router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from genres where GenreId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router