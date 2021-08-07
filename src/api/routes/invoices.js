const express = require("express");
const { InvoiceController } = require("../controllers");
const router = express.Router();

// 1-2
router.get("/", InvoiceController.all);

//3 Joining invoice_Items with Invoices
router.get("/invoice_items", InvoiceController.joinInvoiceItems);

// 4 get invoice by id
router.get("/:id", InvoiceController.getById);

//5 specified invoice_item by :id
router.get("/:id/invoice_items", InvoiceController.getInvoiceItemById);

// inserts a new row
router.post("/", InvoiceController.insert);

// Updates row
router.put("/:id", InvoiceController.update);

router.delete("/:id", InvoiceController.del);

module.exports = router;
