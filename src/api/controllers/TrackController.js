const BaseController = require("./BaseController");

class TrackController extends BaseController {
  constructor(db, tables, tableName) {
    // have to call super since we're inheriting from base controller 
    super(db, tables, tableName);
  }
}

module.exports = TrackController;
