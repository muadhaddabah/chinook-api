const BaseController = require("./BaseController");

class TrackController extends BaseController {
  constructor(db, tables, tableName) {
    // have to call super since we're inheriting from base controller 
    super(db, tables, tableName);
  }

  all = (req, res) => {
    try {
      const { artists, albums, tracks } = this.tables
      const sql = `select ${artists.aliasedFields}, ${albums.aliasedFields}, ${tracks.aliasedFields} from artists as Artist join albums as Album on Artist.ArtistId = Album.ArtistId join tracks as Track on Album.AlbumId = Track.AlbumId `
      // const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
      const stmt = this.db.prepare(`${sql} limit 0,50`);
      const queryResults = stmt.all();
      const results = []
      let temp = {
        Artist: {},
        Album: {}
      }

      queryResults.forEach(track => {
        temp = {
          Artist: {},
          Album: {}
        }
        Object.keys(track).forEach(field => {
          const arr = field.split(".")

          if (arr[0].toLowerCase() === "track") {
            temp[arr[1]] = track[field]
          } else {
            temp[arr[0]][arr[1]] = track[field]
          }
        })
        results.push(temp)
      });
      res.status(200).send({ success: true, data: results, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  };
}

module.exports = TrackController;
