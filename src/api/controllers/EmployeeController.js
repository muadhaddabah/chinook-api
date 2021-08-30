const customer = require("../middleware/validation/rules/customer");
const BaseController = require("./BaseController");

class EmployeeController extends BaseController {
  constructor(db, tables, tableName) {
    // have to call super since we're inheriting from base controller 
    super(db, tables, tableName);
  }

  staff = (req, res) => {
    try {
      const sql = `select ${this.tableAliasFields(
        "Employees",
        this.tables.employees.fields
      )}, ${this.tableAliasFields(
        "Managers",
        this.tables.employees.fields
      )} from employees as Employees join employees as Managers on Employees.ReportsTo = Managers.EmployeeId order by Managers.EmployeeId`;
      console.log("🚀 ~ file: EmployeeController.js ~ line 20 ~ EmployeeController ~ sql", sql)
      const stmt = this.db.prepare(sql);
      const staff = stmt.all();
      res.status(200).send({ success: true, data: staff, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })

    }
  };

  getStaffByPk = (req, res) => {
    try {

      const sql = `select ${this.fieldsList} from employees where ReportsTo = ?`;
      console.log("🚀 ~ file: EmployeeController.js ~ line 32 ~ EmployeeController ~ sql", sql)
      const stmt = this.db.prepare(sql);
      const staff = stmt.all(req.params.id);
      res.status(200).send({ success: true, data: staff, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  };

  getCustomersByPk = (req, res) => {

    try {
      const stmt = this.db.prepare(
        "select * from customers where SupportRepId = ?"
      );
      const customers = stmt.get(req.params.id);
      res.status(200).send({ success: true, data: customers, message: `${this.tableName}.all() ran` });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message, error })
    }
  };

  getcustomersPerEmployee = (req, res) => {
    try {
      const sql = `select  ${this.tables.employees.aliasedFields}, 
      ${this.tableAliasFields('Customer', ['CustomerId', 'FirstName', 'LastName', 'Phone', 'SupportRepId'])}
      from employees as Employee
      join customers as Customer
      on Employee.EmployeeId = Customer.SupportRepId
      where Employee.EmployeeId = ${req.params.id}
      `
      console.log("🚀 ~ file: EmployeeController.js ~ line 55 ~ EmployeeController ~ sql", sql)
      const stmt = this.db.prepare(`${sql}`)
      const queryResults = stmt.all()
      console.log("🚀 ~ file: EmployeeController.js ~ line 67 ~ EmployeeController ~ queryResults", queryResults)

      let results = {
        Customers: []
      }

      if (queryResults && queryResults.length > 0) {

        let temp = {}

        queryResults.forEach(employee => {
          temp = {}

          Object.keys(employee).forEach(field => {
            const arr = field.split(".")

            if (arr[0].toLowerCase() === "customer") {
              temp[arr[1]] = employee[field]
            } else {
              results[arr[1]] = employee[field]
            }
          })
          results.Customers.push(temp)
        });
      }
      res.status(200).send({ success: true, data: results, message: `${this.tableName}.all() ran` })
    } catch (error) {
      console.log("🚀 ~ file: EmployeeController.js ~ line 93 ~ EmployeeController ~ error", error)
      res.status(404).send({ success: false, message: error.message, error })

    }
  }
}

module.exports = EmployeeController;
