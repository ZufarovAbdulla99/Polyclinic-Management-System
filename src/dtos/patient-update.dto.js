const Joi = require("joi")

const updatePatientSchema = Joi.object({
  first_name: Joi.string().min(3),
  last_name: Joi.string().min(3),
  birth_date: Joi.date(),
  address: Joi.string().trim(),
  phone: Joi.string().min(12).max(12),
  passport: Joi.string().alphanum().min(9).max(9),   // // Passport seriya raqam uchun
  area_id: Joi.string().alphanum().min(24).max(24)  // // Obkect Id uchun
  // //image_url: Joi.string(), Keyin qo'shish uchun
});

module.exports = updatePatientSchema