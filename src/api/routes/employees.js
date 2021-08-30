const express = require("express");
const { checkRequiredFieldsExist, validate } = require("../middleware/validation")
const { EmployeeController } = require("../controllers");
const router = express.Router();

// GET .all employees
router.get("/", EmployeeController.all);

// needs to be before /:id so itll be matched first
router.get("/staff", EmployeeController.staff);

// GET specified Id
router.get("/:id", EmployeeController.getById);

router.get("/:id/cust", EmployeeController.getcustomersPerEmployee);

// GET staff members with ReportsTo:id
router.get("/:id/staff", EmployeeController.getStaffByPk);

// GETS customers with SupportRepId
router.get("/:id/customers", EmployeeController.getCustomersByPk);

// Inserts
router.post("/", checkRequiredFieldsExist("employee"), validate("employee"), EmployeeController.insert);

// Updates
router.put("/:id", validate("employee"), EmployeeController.update);

// DELETE
router.delete("/:id", EmployeeController.del);

module.exports = router;
