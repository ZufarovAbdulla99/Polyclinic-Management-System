const {Router} = require("express")
const doctorRouter = require("./doctor.routes")
const visitRouter = require("./visit.routes")
const scheduleRouter = require("./schedule.routes")
const specialityRouter = require("./speciality.routes")
const diagnoseRouter = require("./diagnose.routes")
const areaRouter = require("./area.routes")
const patientRouter = require("./patient.routes")
const nurseRouter = require("./nurse.routes")
const RegistrationNurseRouter = require("./registration_nurse.routes")

const routes = Router()

routes
    .use("/doctor", doctorRouter)
    .use("/visit", visitRouter)
    .use("/schedule", scheduleRouter)
    .use("/speciality", specialityRouter)
    .use("/diagnose", diagnoseRouter)
    .use("/area", areaRouter)
    .use("/patient", patientRouter)
    .use("/nurse", nurseRouter)
    .use("/registration_nurse", RegistrationNurseRouter)

module.exports = routes