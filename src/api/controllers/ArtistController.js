const BaseController = require("./BaseController");

class ArtistController extends BaseController {
  constructor(db, tables, tableName) {
    super(db, tables, tableName);
  }

  joinAlbums = (req, res) => {
    try {
      const sql = `select ${this.tableAliasFields(
        "Artists",
        this.tables.artists.fields
      )}, ${this.tableAliasFields("Albums", this.tables.albums.fields)}
    from artists as Artists
    join albums as Albums
    on Artists.ArtistId = Albums.ArtistId
    order by Artists.ArtistId`;
      const stmt = this.db.prepare(sql);
      const albums = stmt.all();
      res.status(200).send({ success: true, data: albums, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  };

  getAlbumByPk = (req, res) => {
    try {
      const stmt = this.db.prepare("select * from albums where AlbumId = ?");
      const artist = stmt.get(req.params.id);
      res.status(200).send({ success: true, data: artist, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  };

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
