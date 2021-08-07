const express = require("express");
const { InvoiceItemController } = require("../controllers");
const router = express.Router();

//1-2 get * from invoice_items - returns all; .all
router.get("/", InvoiceItemController.all);

//3.5 Joining tracks with Invoice_Items
router.get("/tracks", InvoiceItemController.joinTracks);

//4 GETS specified invoice_item by id
router.get("/:id", InvoiceItemController.getById);

//5.5 specified tracks by :id
router.get("/:id/tracks", InvoiceItemController.getTrackByPk);

//6 inserts a new row
router.post("/", InvoiceItemController.insert);

//7 Updates row
router.put("/:id", InvoiceItemController.update);

//8 DELETE
router.delete("/:id", InvoiceItemController.del);

module.exports = router;
