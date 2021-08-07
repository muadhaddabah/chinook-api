const express = require("express");
const { GenreController } = require("../controllers");
const router = express.Router();

router.get("/", GenreController.all);

router.get("/:id", GenreController.getById);

// inserts new row
router.post("/", GenreController.insert);

// Updates row
router.put("/:id", GenreController.update);

router.delete("/:id");

module.exports = router;
