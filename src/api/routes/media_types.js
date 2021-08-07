const express = require("express");
const { mediaTypeController } = require("../controllers");
const router = express.Router();

router.get("/", mediaTypeController.all);

router.get("/:id", mediaTypeController.getById);

// inserts new row
router.post("/", mediaTypeController.insert);

// Updates row
router.put("/:id", mediaTypeController.update);

router.delete("/:id", mediaTypeController.del);

module.exports = router;
