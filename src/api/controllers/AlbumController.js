const { groupBy, filterObjectByKey } = require("../../utils/helpers");
const BaseController = require("./BaseController");

class AlbumController extends BaseController {
  constructor(db, tables, tableName) {
    // have to call super since we're inheriting from base controller 
    super(db, tables, tableName);
  }

  getById = (req, res) => {
    try {
      const { albums, tracks } = this.tables
      const sql = `select ${albums.aliasedFields}, ${tracks.aliasedFields}
      from albums as Album
      join tracks as Track 
        on Album.AlbumId = Track.AlbumId
      where Album.AlbumId = ${req.params.id}`

      const stmt = this.db.prepare(`${sql}`)
      const queryResults = stmt.all()
      // const results = []
      // let temp = {
      //   Track: {}
      // }

      const tracksByAlbum = Object.values(groupBy(queryResults, "Album.AlbumId"))
      const results = {
        AlbumId: queryResults[0]["Album.AlbumId"],
        Title: queryResults[0]["Album.Title"],
        Tracks: queryResults.map(track => filterObjectByKey(track, "track"))
      }
      // AlbumId: queryResults[0]["Album.AlbumId"],
      // Title: queryResults[0]["Album.Title"].tracksByAlbum.map(it => ({
      //   Tracks: it.map(track => filterObjectByKey(track, "track"))
      // }))

      // Tracks: it.map(track => filterObjectByKey(track, "track"))

      // queryResults.forEach(album => {
      //   temp = {
      //     Track: {}
      //   }

      //   Object.keys(album).forEach(field => {
      //     const arr = field.split(".")

      //     if (arr[0].toLowerCase() === "album") {
      //       temp[arr[1]] = album[field]
      //     } else {
      //       temp[arr[0]][arr[1]] = album[field]
      //     }
      //   })
      //   results.push(temp)
      // })
      res.status(200).send({ success: true, data: results, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  }

  getSalesPerAlbum = (req, res) => {
    try {
      const sql = `SELECT ${this.tableAliasFields('Album', ['AlbumId', 'Title', 'ArtistId'])},
      ${this.tableAliasFields('Invoice_Item', ['UnitPrice'])},
      sum(Invoice_Item.Quantity) as 'Invoice_Item.Quantity',
      sum(Invoice_Item.UnitPrice * Invoice_Item.Quantity) as 'Album.totalSales'
      from albums  as Album
      join tracks as Tracks
      on Album.AlbumId = Tracks.AlbumId
      inner join invoice_items as Invoice_Item
      on Tracks.TrackId = Invoice_Item.TrackId
      group by Album.Title
      order by Album.AlbumId`
      console.log("🚀 ~ file: AlbumController.js ~ line 12 ~ AlbumController ~ sql", sql)

      const stmt = this.db.prepare(`${sql}`)
      const queryResults = stmt.all()
      console.log("🚀 ~ file: AlbumController.js ~ line 25 ~ AlbumController ~ queryResults", queryResults)
      const results = []

      let temp = {
        Track: {},
        Invoice_Item: {}
      }

      queryResults.forEach(album => {
        temp = {
          Track: {},
          Invoice_Item: {}
        }

        Object.keys(album).forEach(field => {
          const arr = field.split(".")

          if (arr[0].toLowerCase() === "album") {
            temp[arr[1]] = album[field]
          } else {
            temp[arr[0]][arr[1]] = album[field]
          }
        })
        results.push(temp)
      });
      res.status(200).send({ success: true, data: results, message: `${this.tableName}.all() ran` })
    } catch (error) {
      console.log("🚀 ~ file: AlbumController.js ~ line 52 ~ AlbumController ~ error", error)
      res.status(404).send({ success: false, message: error.message, error })
    }
  }
}

module.exports = AlbumController;
