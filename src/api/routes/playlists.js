const express = require("express");
const { PlaylistController } = require("../controllers");
const router = express.Router();

router.get("/", PlaylistController.all);

router.get("/:id", PlaylistController.getById);

router.post("/", PlaylistController.insert);

router.put("/:id", PlaylistController.update);

router.delete("/:id", PlaylistController.del);

module.exports = router;
