const { groupBy, filterObjectByKey } = require("../../utils/helpers");
const BaseController = require("./BaseController");

class GenreController extends BaseController {
  constructor(db, tables, tableName) {
    // have to call super since we're inheriting from base controller 
    super(db, tables, tableName);
  }

  displayAlbums = (req, res) => {
    try {
      const { genres, tracks } = this.tables
      const sql = `SELECT  ${genres.aliasedFields}, ${tracks.aliasedFields} 
      from genres as Genre
      join tracks as Track
      on Genre.GenreId = Track.GenreId
      where Track.GenreId = ${req.params.id}`;
      const stmt = this.db.prepare(sql)
      const queryResults = stmt.all()

      const tracksByGenre = Object.values(groupBy(queryResults, "Genre.GenreId"))
      const results = {
        GenreId: queryResults[0]["Genre.GenreId"],
        Name: queryResults[0]["Genre.Name"],
        Tracks: tracksByGenre.map(it => ({
          TrackId: it[0]["Track.TrackId"], Name: it["Track.Name"].map(Name => filterObjectByKey(track, "Name"))
        }))
      }
      res.status(200).send({ success: true, data: results, message: `${this.tableName}.all() ran` })
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  }
}

module.exports = GenreController;
