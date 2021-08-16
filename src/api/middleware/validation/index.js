const rules = require("./rules")


// checking to see if requested values exist and match required fields
const checkRequiredFieldsExist = rule => async (req, res, next) => {
    // checking required array and sorting every array element and checking against the body fields 
    const exists = await rules[rule].required.sort().every(it => Object.keys(req.body).includes(it))
    if (exists) {
        next()
        return
    }
    res.status(422).send({ success: false, message: `1 or more of the following fields are invalid [${Object.keys(req.body)}]` })
}

const validate = rule => async (req, res, next) => {
    // checking fields against the body fields
    const errors = await rules[rule].fields(req.body)
    console.log("🚀 ~ file: index.js ~ line 16 ~ validate ~ errors", errors)
    const combinedErrors = {}
    Object.keys(errors).forEach(field => {
        if (errors[field] && errors[field].length) {
            combinedErrors[field] = errors[field]
        }
    })
    if (Object.keys(combinedErrors).length === 0) {
        next()
        return
    }
    res.status(422).send({ success: false, message: "validation errors", errors: { ...combinedErrors } })
}

module.exports = { checkRequiredFieldsExist, validate }