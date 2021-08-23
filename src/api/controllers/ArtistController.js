const { groupBy, filterObjectByKey } = require("../../utils/helpers");
const BaseController = require("./BaseController");

class ArtistController extends BaseController {
  constructor(db, tables, tableName) {
    super(db, tables, tableName);
  }

  all = (req, res) => {
    try {
      const { artists, albums } = this.tables
      const sql = `select ${artists.aliasedFields}, ${albums.aliasedFields} from artists as Artist join albums as Album on Artist.ArtistId = Album.ArtistId `
      // const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
      const stmt = this.db.prepare(`${sql} limit 0,50`);
      const queryResults = stmt.all();
      const results = []
      let temp = {
        Album: {}
      }

      queryResults.forEach(artist => {
        temp = {
          Album: {}
        }
        Object.keys(artist).forEach(field => {
          const arr = field.split(".")

          if (arr[0].toLowerCase() === "artist") {
            temp[arr[1]] = artist[field]
          } else {
            temp[arr[0]][arr[1]] = artist[field]
          }
        })
        results.push(temp)
      });
      res.status(200).send({ success: true, data: results, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  };

  joinAlbums = (req, res) => {
    try {
      const sql = `select ${this.tables.artists.aliasedFields}
        , ${this.tables.albums.aliasedFields}
    from artists as Artist
    join albums as Album
    on Artist.ArtistId = Album.ArtistId
    order by Artist.ArtistId`;
      const stmt = this.db.prepare(sql);
      const albums = stmt.all();
      res.status(200).send({ success: true, data: albums, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  };

  getAlbumByPk = (req, res) => {
    try {
      const stmt = this.db.prepare(`select ${this.tables.albums.aliasedFields} from albums where AlbumId = ?`);
      const artist = stmt.get(req.params.id);
      res.status(200).send({ success: true, data: artist, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  };

  getById = (req, res) => {
    try {
      const { artists, albums, tracks } = this.tables
      const sql = `select ${artists.aliasedFields},
       ${albums.aliasedFields}, 
       ${tracks.aliasedFields}
        from artists as Artist
        join albums  as Album
        on Artist.ArtistId = Album.ArtistId
        join tracks as Track
        on Album.AlbumId = Track.AlbumId
        where Artist.ArtistId = ${req.params.id} `
      const stmt = this.db.prepare(`${sql} `)
      const queryResults = stmt.all()

      const tracksByAlbum = Object.values(groupBy(queryResults, "Album.AlbumId"))
      const results = {
        ArtistId: queryResults[0]["Artist.ArtistId"],
        Name: queryResults[0]["Artist.Name"],
        Albums: tracksByAlbum.map(it => ({ AlbumId: it[0]["Album.AlbumId"], Title: it[0]["Album.Title"], Tracks: it.map(track => filterObjectByKey(track, "track")) }))
      }

      res.status(200).send({ success: true, data: results, message: `${this.tableName}.all() ran` })
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  }

  getAlbumSales = (req, res) => {
    try {
      // const { artists, albums, tracks, invoice_items } = this.tables
      const sql = `SELECT  ${this.tableAliasFields('Artist', ['ArtistId', 'Name'])}, ${this.tableAliasFields('Album', ['AlbumId', 'Title'])}, ${this.tableAliasFields('Track', ['Name', 'TrackId'])},${this.tableAliasFields('Invoice_Item', ['Quantity', 'UnitPrice'])},  count(Invoice_Item.TrackId) as 'Artist.Count',  sum(Invoice_Item.UnitPrice) as 'Artist.totalSales'
      from artists as Artist
      join albums as Album
      on Artist.ArtistId = Album.ArtistId
      join tracks as Track
      on Album.AlbumId = Track.AlbumId
      inner join invoice_items as Invoice_Item
      on Track.TrackId = Invoice_Item.TrackId
      group by Artist.ArtistId
      order by Artist.ArtistId asc`
      console.log("🚀 ~ file: ArtistController.js ~ line 87 ~ ArtistController ~ sql", sql)
      const stmt = this.db.prepare(`${sql} `)
      const queryResults = stmt.all()
      console.log("🚀 ~ file: ArtistController.js ~ line 99 ~ ArtistController ~ queryResults", queryResults)
      const results = []
      let temp = {
        Album: {},
        Track: {},
        Invoice_Item: {}
      }


      queryResults.forEach(artist => {
        temp = {
          Album: {},
          Track: {},
          Invoice_Item: {},
        }

        Object.keys(artist).forEach(field => {
          const arr = field.split(".")

          if (arr[0].toLowerCase() === "artist") {
            temp[arr[1]] = artist[field]
          } else {
            temp[arr[0]][arr[1]] = artist[field]
          }
        })
        results.push(temp)
      });
      res.status(200).send({ success: true, data: results, message: `${this.tableName}.all() ran` })
    } catch (error) {
      console.log("🚀 ~ file: ArtistController.js ~ line 126 ~ ArtistController ~ error", error)
      res.status(404).send({ success: false, message: error.message, error })
    }
  }

}

// SELECT  a.Name, al.Title, t.Name, t.TrackId, ii.InvoiceLineId, count(ii.TrackId), t.UnitPrice, sum(ii.UnitPrice) as totalSales
// from artists as a
// join albums as al
// on a.ArtistId = al.ArtistId
// join tracks as t
// on al.AlbumId = t.AlbumId
// inner join invoice_items as ii
// on t.TrackId = ii.TrackId
// group by t.TrackId
// order by totalSales desc


module.exports = ArtistController;
