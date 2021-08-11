const express = require("express");
const { checkRequiredFieldsExist, validate } = require("../middleware/validation")
const { GenreController } = require("../controllers");
const router = express.Router();

router.get("/", GenreController.all);

router.get("/:id", GenreController.getById);

// inserts new row
router.post("/", checkRequiredFieldsExist("genre"), validate("genre"), GenreController.insert);

// Updates row
router.put("/:id", validate("genre"), GenreController.update);

router.delete("/:id");

module.exports = router;
