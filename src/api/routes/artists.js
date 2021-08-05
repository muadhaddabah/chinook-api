const express = require('express')
const {tableAliasFields} = require('../../utils/helpers')
const router = express.Router()
// imported database instance
const db = require('../../utils/db')
// already in artists file // artists fields
const fields = ['ArtistId', 'Name']
// add album fields
const albumFields = ['AlbumId', 'Title', 'ArtistId']

//1-2 get * from artists - return all; .all
router.get("/", (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : ""
    const stmt = db.prepare(`select * from artists ${orderBy}`)
    const artists = stmt.all()
    res.status(200).send(artists)
})

//4 needs to be before /:id so it'll be matched first
// Joining albums with artists
router.get("/albums", (req, res) => {
    const sql = `select ${tableAliasFields('Artists', fields)}, ${tableAliasFields('Albums', albumFields)} 
    from artists as Artists 
    join albums as Albums 
    on Artists.ArtistId = Albums.ArtistId
order by Artists.ArtistId` 
    const stmt = db.prepare(sql)
    const albums = stmt.all()
    res.send(albums)
})

//3 returns specified artist by :id
router.get("/:id", (req, res) => {
    const stmt = db.prepare('select * from artists where ArtistId = ?')
    const artist = stmt.get(req.params.id)
    res.send(artist)
})

//5 specified album by :id
router.get("/:id/albums", (req, res) => {
    const stmt = db.prepare('select * from albums where AlbumId = ?')
    const artist = stmt.get(req.params.id)
    res.send(artist)
})

//6 inserts new row
router.post("/", (req, res) => {
    const stmt = db.prepare('insert into artists (Name) values(:Name)')
    const result = stmt.run(req.body)
    res.status(201).send(result)
})

//7 Updates row
router.put("/:id", (req, res) => {
    const stmt = db.prepare('update artists set Name = :Name where ArtistId = :ArtistId')
    const result = stmt.run({...req.body, ArtistId: req.params.id})
    res.send(result)
})

// 8 DELETE
router.delete("/:id", (req, res) => {
    const stmt = db.prepare('delete from artists where ArtistId = ?')
    const result = stmt.run(req.params.id)
    res.send(result)
})


module.exports = router