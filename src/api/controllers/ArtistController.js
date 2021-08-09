const BaseController = require("./BaseController");

class ArtistController extends BaseController {
  constructor(db, tables, tableName) {
    super(db, tables, tableName);
  }

  joinAlbums = (req, res) => {
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
    res.send(albums);
  };

  getAlbumByPk = (req, res) => {
    const stmt = this.db.prepare("select * from albums where AlbumId = ?");
    const artist = stmt.get(req.params.id);
    res.send(artist);
  };

}

module.exports = ArtistController;
