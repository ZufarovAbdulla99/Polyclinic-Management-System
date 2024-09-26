const { Router } = require("express");
const doctorRouter = require("../modules/doctor/doctor.routes");
const visitRouter = require("../modules/visit/visit.routes");
const scheduleRouter = require("../modules/schedule/schedule.routes");
const specialityRouter = require("../modules/speciality/speciality.routes");
const diagnoseRouter = require("../modules/diagnose/diagnose.routes");
const areaRouter = require("../modules/area/area.routes");
const patientRouter = require("../modules/patient/patient.routes");
const nurseRouter = require("../modules/nurse/nurse.routes");
const RegistrationNurseRouter = require("../modules/registration-nurse/registration_nurse.routes");
const authRoutes = require("../modules/auth/auth.routes");

const routes = Router();

routes
  .use("/auth", authRoutes)
  .use("/doctor", doctorRouter)
  .use("/visit", visitRouter)
  .use("/schedule", scheduleRouter)
  .use("/speciality", specialityRouter)
  .use("/diagnose", diagnoseRouter)
  .use("/area", areaRouter)
  .use("/patient", patientRouter)
  .use("/nurse", nurseRouter)
  .use("/registration_nurse", RegistrationNurseRouter);

module.exports = routes;
