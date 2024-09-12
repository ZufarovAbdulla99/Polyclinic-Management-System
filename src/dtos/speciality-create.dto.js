const Joi = require("joi")

const createSpecialitySchema = Joi.object({
    name: Joi.string().required()
})

module.exports = createSpecialitySchema