const express = require("express");
const { AlbumController } = require("../controllers");
const router = express.Router();

// return all by.all
router.get("/", AlbumController.all);

// get by id
router.get("/:id", AlbumController.getById);

// inserts a new row
router.post("/", AlbumController.insert);

// Updates row
router.put("/:id", AlbumController.update);

// delte by id
router.delete("/:id", AlbumController.del);

module.exports = router;
