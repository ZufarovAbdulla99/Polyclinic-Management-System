const Joi = require("joi")

const createVisitSchema = Joi.object({
  doctor_id: Joi.string().alphanum().min(24).max(24).required(),
  patient_id: Joi.string().alphanum().min(24).max(24).required(),
  diagnose_id: Joi.array().items(Joi.string()).required(),
  visit_record: Joi.string().required(),
  examination: Joi.string().required()
});

module.exports = createVisitSchema