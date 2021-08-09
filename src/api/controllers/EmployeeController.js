const BaseController = require("./BaseController");

class EmployeeController extends BaseController {
  constructor(db, tables, tableName) {
    // have to call super since we're inheriting from base controller 
    super(db, tables, tableName);
  }

  staff = (req, res) => {
    const sql = `select ${this.tableAliasFields(
      "Employees",
      this.tables.employees.fields
    )}, ${this.tableAliasFields(
      "Managers",
      this.tables.employees.fields
    )} from employees as Employees join employees as Managers on Employees.ReportsTo = Managers.EmployeeId order by Managers.EmployeeId`;
    const stmt = this.db.prepare(sql);
    const staff = stmt.all();
    res.send(staff);
  };

  getStaffByPk = (req, res) => {
    const sql = `select ${this.fieldsList} from employees where ReportsTo = ?`;
    const stmt = this.db.prepare(sql);
    const staff = stmt.all(req.params.id);
    res.send(staff);
  };

  getCustomersByPk = (req, res) => {
    const stmt = this.db.prepare(
      "select * from customers where SupportRepId = ?"
    );
    const customers = stmt.get(req.params.id);
    res.send(customers);
  };

}

module.exports = EmployeeController;
