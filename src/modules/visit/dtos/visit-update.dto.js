const Joi = require("joi")

const updateVisitSchema = Joi.object({
  doctor_id: Joi.string().alphanum().min(24).max(24),
  patient_id: Joi.string().alphanum().min(24).max(24),
  diagnose_id: Joi.array().items(Joi.string()),
  visit_record: Joi.string(),
  examination: Joi.string()
});

module.exports = updateVisitSchema