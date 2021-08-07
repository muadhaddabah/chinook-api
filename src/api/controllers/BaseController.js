class BaseController {
  tableAliasFields = (alias, fields) =>
    fields.map((f) => `${alias}.${f} as \`${alias}.${f}\``).join(",");
}

module.exports = BaseController;
