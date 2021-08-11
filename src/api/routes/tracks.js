const express = require("express");
const { checkRequiredFieldsExist, validate } = require("../middleware/validation")
const { TrackController } = require("../controllers");
const router = express.Router();
// imported database instance
const { db } = require("../../utils/db");

router.get("/", TrackController.all);

router.get("/:id", TrackController.getById);

// inserts new row
router.post("/", checkRequiredFieldsExist("track"), validate("track"), TrackController.insert);

// Updates row
router.put("/:id", validate("track"), TrackController.update);

router.delete("/:id", TrackController.del);

module.exports = router;
