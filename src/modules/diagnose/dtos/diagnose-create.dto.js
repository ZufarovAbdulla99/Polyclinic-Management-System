const Joi = require("joi")

const createDiagnoseSchema = Joi.object({
    name: Joi.string().required()
})

module.exports = createDiagnoseSchema