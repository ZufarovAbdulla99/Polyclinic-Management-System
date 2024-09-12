const Joi = require("joi")

const updateDiagnoseSchema = Joi.object({
    name: Joi.string()
})

module.exports = updateDiagnoseSchema