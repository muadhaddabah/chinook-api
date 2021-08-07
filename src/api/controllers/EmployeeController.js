const BaseController = require("./BaseController");

class EmployeeController extends BaseController {
  constructor(db, fields) {
    super();
    this.db = db;
    this.fields = fields;

    this.employeeFields = fields.employees.join(",");
  }

  all = (req, res) => {
    const orderBy = req.query.sort ? ` order by ${req.query.sort} desc` : "";
    const stmt = this.db.prepare(`select * from employees ${orderBy}`);
    const employees = stmt.all();
    res.status(200).send(employees);
  };

  staff = (req, res) => {
    const sql = `select ${this.tableAliasFields(
      "Employees",
      this.fields.employees
    )}, ${this.tableAliasFields(
      "Managers",
      this.fields.employees
    )} from employees as Employees join employees as Managers on Employees.ReportsTo = Managers.EmployeeId order by Managers.EmployeeId`;
    const stmt = this.db.prepare(sql);
    const staff = stmt.all();
    res.send(staff);
  };

  getByPk = (req, res) => {
    const stmt = this.db.prepare(
      `select ${this.employeeFields} from employees where EmployeeId = ?`
    );
    const employee = stmt.get(req.params.id);
    res.send(employee);
  };

  getStaffByPk = (req, res) => {
    const sql = `select ${this.employeeFields} from employees where ReportsTo = ?`;
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

  create = (req, res) => {
    const insertFields = Object.keys(req.body);
    const insertValuesPlaceholders = insertFields
      .map((field) => `:${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `insert into employees (${insertFields.join(
        ","
      )}) values(${insertValuesPlaceholders})`
    );
    const result = stmt.run(req.body);
    res.status(201).send(result);
  };

  update = (req, res) => {
    const updateFields = Object.keys(req.body)
      .map((field) => `${field} = :${field}`)
      .join(",");
    const stmt = this.db.prepare(
      `update employees set ${updateFields} where EmployeeId = :EmployeeId`
    );
    const result = stmt.run({ ...req.body, EmployeeId: req.params.id });
    res.send(result);
  };

  del = (req, res) => {
    const stmt = this.db.prepare("delete from employees where EmployeeId = ?");
    const result = stmt.run(req.params.id);
    res.send(result);
  };
}

module.exports = EmployeeController;
