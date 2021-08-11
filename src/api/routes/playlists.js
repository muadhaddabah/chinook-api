const express = require("express");
const { checkRequiredFieldsExist, validate } = require("../middleware/validation")
const { PlaylistController } = require("../controllers");
const router = express.Router();

router.get("/", PlaylistController.all);

router.get("/:id", PlaylistController.getById);

router.post("/", checkRequiredFieldsExist("playlist"), validate("playlist"), PlaylistController.insert);

router.put("/:id", validate("playlist"), PlaylistController.update);

router.delete("/:id", PlaylistController.del);

module.exports = router;
