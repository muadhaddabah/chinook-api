
const express = require('express')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')

router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from tracks ${orderBy}`)
    const tracks = stmt.all()
    res.status(200).send(tracks)
})

router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from tracks where TrackId = ?')
    const track = stmt.get(req.params.id)
    res.send(track)
})

// inserts new row
router.post("/", (req, res) => {
    const stmt = db.prepare('insert into tracks (Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice) values(:Name, :AlbumId, :MediaTypeId, :GenreId, :Composer, :Milliseconds, :Bytes, :UnitPrice)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})

// Updates row
router.put("/:id", (req, res) => {
    const stmt = db.prepare('update tracks set Name=:Name, AlbumId=:AlbumId, MediaTypeId=:MediaTypeId, GenreId=:GenreId, Composer=:Composer, Milliseconds=:Milliseconds, Bytes=:Bytes, UnitPrice=:UnitPrice  where TrackId = :TrackId')
    const result = stmt.run({...req.body, TrackId: req.params.id})
    res.send(result)
})

router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from tracks where TrackId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router