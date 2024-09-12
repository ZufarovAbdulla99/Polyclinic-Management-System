const Joi = require("joi")

const createPatientSchema = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  birth_date: Joi.date().required(),
  address: Joi.string().trim().required(),
  phone: Joi.string().min(12).max(12).required(),
  passport: Joi.string().alphanum().min(9).max(9).required(),   // // Passport seriya raqam uchun
  area_id: Joi.string().alphanum().min(24).max(24).required()  // // Obkect Id uchun
  // //image_url: Joi.string(), Keyin qo'shish uchun
});

module.exports = createPatientSchema