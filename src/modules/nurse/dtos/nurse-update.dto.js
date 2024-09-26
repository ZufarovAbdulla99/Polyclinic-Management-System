const Joi = require("joi")

const updateNurseSchema = Joi.object({
  first_name: Joi.string().min(3),
  last_name: Joi.string().min(3),
  birth_date: Joi.date(),
  address: Joi.string().trim(),
  phone: Joi.string().min(12).max(12),
  passport: Joi.string().alphanum().min(9).max(9),   // // Passport seriya raqam uchun
  date_of_recruitment: Joi.string(),
  schedule_id: Joi.array().items(Joi.string()),
  speciality_id: Joi.string().alphanum().min(24).max(24),
  area_id: Joi.string().alphanum().min(24).max(24),  // // Obkect Id uchun
  // // role: Joi.string().valid("nurse", "registration_nurse", "doctor", "admin"),
  // // image_url: Joi.string(), Keyin qo'shish uchun
});

module.exports = updateNurseSchema