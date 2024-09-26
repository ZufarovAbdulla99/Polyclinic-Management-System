const Joi = require("joi")

const createNurseSchema = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  birth_date: Joi.date().required(),
  address: Joi.string().trim().required(),
  phone: Joi.string().min(12).max(12).required(),
  passport: Joi.string().alphanum().min(9).max(9).required(),   // // Passport seriya raqam uchun
  date_of_recruitment: Joi.string().required(),
  schedule_id: Joi.array().items(Joi.string()).required(),
  speciality_id: Joi.string().alphanum().min(24).max(24).required(),
  area_id: Joi.string().alphanum().min(24).max(24).required(),  // // Obkect Id uchun
  role: Joi.string().valid("nurse", "registration_nurse", "doctor", "admin"),
  // //image_url: Joi.string(), Keyin qo'shish uchun
});

module.exports = createNurseSchema