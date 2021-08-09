const BaseController = require("./BaseController");

class InvoiceItemController extends BaseController {
  constructor(db, tables, tableName) {
    // have to call super since we're inheriting from base controller 
    super(db, tables, tableName);
  }

  joinTracks = (req, res) => {
    const sql = `select ${this.tableAliasFields(
      "Invoice_items",
      this.tables.invoice_items.fields
    )}, ${this.tableAliasFields("Tracks", this.tables.tracks.fields)}
    from invoice_items as Invoice_items
    join tracks as Tracks
    on Invoice_items.TrackId = Tracks.TrackId
    order by Invoice_items.TrackId`;
    const stmt = this.db.prepare(sql);
    const tracks = stmt.all();
    res.send(tracks);
  };

  getTrackByPk = (req, res) => {
    const stmt = this.db.prepare("select * from tracks where trackId = ?");
    const track = stmt.get(req.params.id);
    res.send(track);
  };
}

module.exports = InvoiceItemController;
