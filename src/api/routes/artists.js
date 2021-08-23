const express = require("express");
const { checkRequiredFieldsExist, validate } = require("../middleware/validation")
const { ArtistController } = require("../controllers");
const router = express.Router();

//1-2 get * from artists - return all; .all
router.get("/", ArtistController.all);

router.get("/sales", ArtistController.getAlbumSales);

//4 needs to be before /:id so it'll be matched first
// Joining albums with artists
// router.get("/albums", ArtistController.joinAlbums);

//3 returns specified artist by :id
router.get("/:id", ArtistController.getById);

//5 specified album by :id
router.get("/:id/albums", ArtistController.getAlbumByPk);


router.get("/:id/albumss", ArtistController.getAlbumSales);

//6 inserts new row
router.post("/", checkRequiredFieldsExist("artist"), validate("artist"), ArtistController.insert);

//7 Updates row
router.put("/:id", validate("artist"), ArtistController.update);

// 8 DELETE
router.delete("/:id", ArtistController.del);

module.exports = router;
