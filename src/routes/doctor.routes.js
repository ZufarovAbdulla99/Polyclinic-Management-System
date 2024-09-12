const {Router} = require("express")
const doctorController = require("../controllers/doctor.controller")
const ValidationMiddleware = require("../middlewares/validation.middleware")
const createDoctorSchema = require("../dtos/doctor-create.dto")
const updateDoctorSchema = require("../dtos/doctor-update.dto")

const doctorRouter = Router()

doctorRouter
    .get("/:doctorId", doctorController.getDoctor)
    .get("/", doctorController.getAllDoctors)
    .post("/add", ValidationMiddleware(createDoctorSchema), doctorController.createDoctor)
    .patch("/update/:doctorId", ValidationMiddleware(updateDoctorSchema), doctorController.updateDoctor)
    .delete("/delete/:doctorId", doctorController.deleteDoctor)
    .delete("/delete", doctorController.deleteAllDoctors)

module.exports = doctorRouter