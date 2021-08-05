//aliasing Employees.EmployeeId as `Employees.EmployeeId`
const tableAliasFields = (alias, fields) => fields.map(f => `${alias}.${f} as \`${alias}.${f}\``).join(',')

module.exports={tableAliasFields}