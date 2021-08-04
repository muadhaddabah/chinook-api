
const express = require('express')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')

router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from media_types ${orderBy}`)
    const media_types = stmt.all()
    res.status(200).send(media_types)
})

router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from media_types where MediaTypeId = ?')
    const media_type = stmt.get(req.params.id)
    res.send(media_type)
})

// inserts new row
router.post("/", (req, res) => {
    const stmt = db.prepare('insert into media_types (Name) values(:Name)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})

// Updates row
router.put("/:id", (req, res) => {
    const stmt = db.prepare('update media_types set Name = :Name where MediaTypeId = :MediaTypeId')
    const result = stmt.run({...req.body, MediaTypeId: req.params.id})
    res.send(result)
})

router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from media_types where MediaTypeId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router