const express = require('express')
const {tableAliasFields} = require('../../utils/helpers')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')
// alrerady in artists file
const fields = ['ArtistId', 'Name']
// add album fields
const albumFields = ['AlbumId', 'Title', 'ArtistId']


router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from artists ${orderBy}`)
    const artists = stmt.all()
    res.status(200).send(artists)
})

// needs to be before /:id so itll be matched first
router.get("/albums", (req, res) => {
    const sql = `select ${tableAliasFields('Artists', fields)}, ${tableAliasFields('Albums', albumFields)} from artists as Artists join albums as Albums on Artists.ArtistId = Albums.ArtistId
order by Artists.ArtistId` 
    const stmt = db.prepare(sql)
    const albums = stmt.all()
    res.send(albums)
})

router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from artists where ArtistId = ?')
    const artist = stmt.get(req.params.id)
    res.send(artist)
})

// specified album :id
router.get("/:id/albums", (req, res) => {
    const stmt = db.prepare('select * from albums where AlbumId = ?')
    const artist = stmt.get(req.params.id)
    res.send(artist)
})

// inserts new row
router.post("/", (req, res) => {
    const stmt = db.prepare('insert into artists (Name) values(:Name)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})

// Updates row
router.put("/:id", (req, res) => {
    const stmt = db.prepare('update artists set Name = :Name where ArtistId = :ArtistId')
    const result = stmt.run({...req.body, ArtistId: req.params.id})
    res.send(result)
})

router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from artists where ArtistId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router