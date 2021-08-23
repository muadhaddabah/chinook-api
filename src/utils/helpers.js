//aliasing Employees.EmployeeId as `Employees.EmployeeId`
const tableAliasFields = (alias, fields) => fields.map(f => `${alias}.${f} as \`${alias}.${f}\``).join(',')

const groupBy = (arr, key) => arr.reduce((prev, curr) => {
    (prev[curr[key]] = prev[curr[key]] || []).push(curr)
    return prev
}, {})

const filterObjectByKey = (obj, key) => {
    let temp = {}

    Object.keys(obj).forEach(field => {
        const arr = field.split(".")

        if (arr[0].toLowerCase() === key) {
            temp[arr[1]] = obj[field]
        }
    })
    return temp
}

module.exports = { tableAliasFields, groupBy, filterObjectByKey }