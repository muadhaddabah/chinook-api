const express = require("express");
const { checkRequiredFieldsExist, validate } = require("../middleware/validation")
const { CustomerController } = require("../controllers");
const router = express.Router();

// 1-2 GET * from customers and returns .all || optional sort
router.get("/", CustomerController.all);

router.get("/:id/history", CustomerController.getHistory);

router.get("/:id/spc", CustomerController.getSalesPerCustomer);
//3 joining invoices with customers and renaming fields with tAF function (helper)
router.get("/invoices", CustomerController.joinInvoices);

// 4 Returns specified customer by :id
router.get("/:id", CustomerController.getById);

//5 specified invoice by :id
router.get("/:id/invoices", CustomerController.getInvoiceById);

//6 Inserts row into Customers
router.post("/", checkRequiredFieldsExist("customer"), validate("customer"), CustomerController.insert);

//7 Updates by :id
router.put("/:id", validate("customer"), CustomerController.update);

//8 DELETES
router.delete("/:id", CustomerController.del);

module.exports = router;
