const Joi = require("joi")

const updateScheduleSchema = Joi.object({
  appointment_day: Joi.string(),
  appointment_hour: Joi.string(),
  room_number: Joi.number().integer().min(1).max(500),
});

module.exports = updateScheduleSchema