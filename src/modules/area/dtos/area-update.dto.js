const Joi = require("joi")

const updateAreaSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  population: Joi.number(),
});

module.exports = updateAreaSchema