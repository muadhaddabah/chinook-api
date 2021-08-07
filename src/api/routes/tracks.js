const express = require("express");
const { TrackController } = require("../controllers");
const router = express.Router();
// imported database instance
const { db } = require("../../utils/db");

router.get("/", TrackController.all);

router.get("/:id", TrackController.getById);

// inserts new row
router.post("/", TrackController.insert);

// Updates row
router.put("/:id", TrackController.update);

router.delete("/:id", TrackController.del);

module.exports = router;
