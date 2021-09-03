const express = require("express");
const { checkRequiredFieldsExist, validate } = require("../middleware/validation")
const { AlbumController } = require("../controllers");
const router = express.Router();

// return all by.all
router.get("/", AlbumController.all);

router.get("/sz", AlbumController.getSalesPerAlbum);

// get by id
router.get("/:id", AlbumController.getById);

// inserts a new row
router.post("/", checkRequiredFieldsExist("album"), validate("album"), AlbumController.insert);

// Updates row
router.put("/:id", validate("album"), AlbumController.update);

// delte by id
router.delete("/:id", AlbumController.del);

module.exports = router;
