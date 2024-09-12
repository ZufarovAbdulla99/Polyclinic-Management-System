const Joi = require("joi")

const updateSpecialitySchema = Joi.object({
    name: Joi.string()
})

module.exports = updateSpecialitySchema