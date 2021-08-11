const express = require("express");
const { checkRequiredFieldsExist, validate } = require("../middleware/validation")
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
router.post("/", checkRequiredFieldsExist("invoice"), validate("invoice"), InvoiceController.insert);

// Updates row
router.put("/:id", validate("invoice"), InvoiceController.update);

router.delete("/:id", InvoiceController.del);

module.exports = router;
