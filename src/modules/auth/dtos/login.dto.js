const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(20).required(),
  password: Joi.string().alphanum().min(8).max(20).required(),
});

module.exports = loginSchema