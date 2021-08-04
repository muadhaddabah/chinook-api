
const express = require('express')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')

router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from playlists ${orderBy}`)
    const playlists = stmt.all()
    res.status(200).send(playlists)
})

router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from playlists where PlaylistId = ?')
    const playlist = stmt.get(req.params.id)
    res.send(playlist)
})

// inserts new row
router.post("/", (req, res) => {
    const stmt = db.prepare('insert into playlists (Name) values(:Name)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})

// Updates row
router.put("/:id", (req, res) => {
    const stmt = db.prepare('update playlists set Name = :Name where PlaylistId = :PlaylistId')
    const result = stmt.run({...req.body, PlaylistId: req.params.id})
    res.send(result)
})

router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from playlists where PlaylistId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router