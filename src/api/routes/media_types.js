const express = require("express");
const { checkRequiredFieldsExist, validate } = require("../middleware/validation")
const { mediaTypeController } = require("../controllers");
const router = express.Router();

router.get("/", mediaTypeController.all);

router.get("/:id/trac", mediaTypeController.getTracks);

router.get("/:id", mediaTypeController.getById);

// inserts new row
router.post("/", checkRequiredFieldsExist("media_type", validate("media_type")), mediaTypeController.insert);

// Updates row
router.put("/:id", validate("media_type"), mediaTypeController.update);

router.delete("/:id", mediaTypeController.del);

module.exports = router;
