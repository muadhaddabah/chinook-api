const BaseController = require("./BaseController");

class ArtistController extends BaseController {
  constructor(db, fields) {
    super();
    this.db = db;
    this.fields = fields;

    this.artistFields = fields.artists.join(",");
  }

  all = (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
    const stmt = this.db.prepare(`select * from artists ${orderBy}`);
    const artists = stmt.all();
    res.status(200).send(artists);
  };

  joinAlbums = (req, res) => {
    const sql = `select ${this.tableAliasFields(
      "Artists",
      this.fields.artists
    )}, ${this.tableAliasFields("Albums", this.fields.albums)}
    from artists as Artists
    join albums as Albums
    on Artists.ArtistId = Albums.ArtistId
    order by Artists.ArtistId`;
    const stmt = this.db.prepare(sql);
    const albums = stmt.all();
    res.send(albums);
  };

  getById = (req, res) => {
    const stmt = db.prepare(
      `select ${this.artistFields} from artists where ArtistId = ?`
    );
    const artist = stmt.get(req.params.id);
    res.send(artist);
  };

  getAlbumByPk = (req, res) => {
    const stmt = this.db.prepare("select * from albums where AlbumId = ?");
    const artist = stmt.get(req.params.id);
    res.send(artist);
  };

  insert = (req, res) => {
    const insertFields = Object.keys(req.body);
    const insertValuesPlaceholders = insertFields
      .map((field) => `:${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `insert into artists (${insertFields.join(
        ","
      )}) values(${insertValuesPlaceholders})`
    );
    const result = stmt.run(req.body);
    res.status(201).send(result);
  };

  update = (req, res) => {
    const updateFields = Object.keys(req.body)
      .map((field) => `${field} = :${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `update artists set ${updateFields} where ArtistId = :ArtistId`
    );
    const result = stmt.run({ ...req.body, ArtistId: req.params.id });
    res.send(result);
  };

  del = (req, res) => {
    const stmt = this.db.prepare("delete from artists where ArtistId = ?");
    const result = stmt.run(req.params.id);
    res.send(result);
  };
}

module.exports = ArtistController;
