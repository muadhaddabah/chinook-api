const express = require("express");
const { EmployeeController } = require("../controllers");
const router = express.Router();

// GET .all employees
router.get("/", EmployeeController.all);

// needs to be before /:id so itll be matched first
router.get("/staff", EmployeeController.staff);

// GET specified Id
router.get("/:id", EmployeeController.getById);

// GET staff members with ReportsTo:id
router.get("/:id/staff", EmployeeController.getStaffByPk);

// GETS customers with SupportRepId
router.get("/:id/customers", EmployeeController.getCustomersByPk);

// Inserts
router.post("/", EmployeeController.insert);

// Updates
router.put("/:id", EmployeeController.update);

// DELETE
router.delete("/:id", EmployeeController.del);

module.exports = router;
