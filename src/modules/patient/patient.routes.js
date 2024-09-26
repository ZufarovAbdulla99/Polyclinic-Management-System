const { Router } = require("express");
const patientController = require("./patient.controller");
const ValidationMiddleware = require("../../middlewares/validation.middleware");
const createPatientSchema = require("./dtos/patient-create.dto");
const updatePatientSchema = require("./dtos/patient-update.dto");
const upload = require("../../utils/multer.utils");
const CheckAuthGuard = require("../../guards/check-auth.guard");
const CheckRolesGuard = require("../../guards/check-role.guard");

const patientRouter = Router();

patientRouter
  .get(
    "/:patientId",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    patientController.getPatient
  )
  .get(
    "/",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    patientController.getAllPatients
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("nurse", "admin"),
    upload.array("image_url"),
    ValidationMiddleware(createPatientSchema),
    patientController.createPatient
  )
  .patch(
    "/update/:patientId",
    CheckAuthGuard(true),
    CheckRolesGuard("nurse", "admin"),
    upload.array("image_url"),
    ValidationMiddleware(updatePatientSchema),
    patientController.updatePatient
  )
  .delete(
    "/delete/:patientId",
    CheckAuthGuard(true),
    CheckRolesGuard("nurse", "admin"),
    patientController.deletePatient
  )
  .delete(
    "/delete",
    CheckAuthGuard(true),
    CheckRolesGuard("nurse", "admin"),
    patientController.deleteAllPatients
  );

module.exports = patientRouter;
