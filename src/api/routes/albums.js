const express = require('express')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')

router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from albums ${orderBy}`)
    const albums = stmt.all()
    res.status(200).send(albums)
})

router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from albums where AlbumId = ?')
    const album = stmt.get(req.params.id)
    res.send(album)
})

// inserts a new row
router.post("/", (req, res) => {
    const stmt = db.prepare('insert into albums (Title, ArtistId) values(:Title, :ArtistId)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})

// Updates row
router.put("/:id", (req, res) => {
    const stmt = db.prepare('update albums set Title = :Title,  ArtistId = :ArtistId  where AlbumId = :AlbumId')
    const result = stmt.run({...req.body, AlbumId: req.params.id})
    res.send(result)
})

router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from albums where AlbumId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router