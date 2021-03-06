const { groupBy, filterObjectByKey } = require("../../utils/helpers");
const media_type = require("../middleware/validation/rules/media_type");
const BaseController = require("./BaseController");

class mediaTypeController extends BaseController {
  constructor(db, tables, tableName) {
    // have to call super since we're inheriting from base controller 
    super(db, tables, tableName);
  }

  getTracks = (req, res) => {
    try {
      const sql = `select ${this.tableAliasFields('MediaType', ['MediaTypeId', 'Name'])}, 
      ${this.tableAliasFields('Track', ['TrackId', 'Name'])}
      from media_types as MediaType
      join tracks as Track
      on MediaType.MediaTypeId = Track.MediaTypeId
      where MediaType.MediaTypeId = ${req.params.id}
      group by Track.Name`
      console.log("🚀 ~ file: mediaTypeController.js ~ line 15 ~ mediaTypeController ~ sql", sql)
      const stmt = this.db.prepare(`${sql}`)
      const queryResults = stmt.all()
      console.log("🚀 ~ file: mediaTypeController.js ~ line 24 ~ mediaTypeController ~ queryResults", queryResults)

      const results = {
        ...filterObjectByKey(queryResults[0], "mediatype"),
        tracks: queryResults.map(it => ({ ...filterObjectByKey(it, "track") }))
      }

      res.status(200).send({ success: true, data: results, message: `${this.tableName}.all() ran` })
    } catch (error) {
      console.log("🚀 ~ file: mediaTypeController.js ~ line 59 ~ mediaTypeController ~ error", error)
      res.status(404).send({ success: false, message: error.message, error })

    }
  }
}

module.exports = mediaTypeController;
