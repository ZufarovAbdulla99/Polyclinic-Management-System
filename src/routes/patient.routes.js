const {Router} = require("express")
const patientController = require("../controllers/patient.controller")
const ValidationMiddleware = require("../middlewares/validation.middleware")
const createPatientSchema = require("../dtos/patient-create.dto")
const updatePatientSchema = require("../dtos/patient-update.dto")
const upload = require("../utils/multer.utils")

const patientRouter = Router()

patientRouter
    .get("/:patientId", patientController.getPatient)
    .get("/", patientController.getAllPatients)
    .post("/add", upload.array("image_url"), ValidationMiddleware(createPatientSchema), patientController.createPatient)
    .patch("/update/:patientId", upload.array("image_url"), ValidationMiddleware(updatePatientSchema), patientController.updatePatient)
    .delete("/delete/:patientId", patientController.deletePatient)
    .delete("/delete", patientController.deleteAllPatients)

module.exports = patientRouter