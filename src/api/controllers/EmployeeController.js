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

}

module.exports = EmployeeController;
