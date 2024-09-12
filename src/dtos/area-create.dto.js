const Joi = require("joi")

const createAreaSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  population: Joi.number().required(),
});

module.exports = createAreaSchema