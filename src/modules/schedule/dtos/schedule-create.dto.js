const Joi = require("joi")

const createScheduleSchema = Joi.object({
  appointment_day: Joi.string().required(),
  appointment_hour: Joi.string().required(),
  room_number: Joi.number().integer().min(1).max(500).required(),
});

module.exports = createScheduleSchema