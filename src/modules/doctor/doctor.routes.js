const { Router } = require("express");
const doctorController = require("./doctor.controller");
const ValidationMiddleware = require("../../middlewares/validation.middleware");
const createDoctorSchema = require("./dtos/doctor-create.dto");
const updateDoctorSchema = require("./dtos/doctor-update.dto");
const CheckAuthGuard = require("../../guards/check-auth.guard");
const CheckRolesGuard = require("../../guards/check-role.guard");

const doctorRouter = Router();

doctorRouter
  .get(
    "/:doctorId",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    doctorController.getDoctor
  )
  .get(
    "/",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    doctorController.getAllDoctors
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(createDoctorSchema),
    doctorController.createDoctor
  )
  .patch(
    "/update/:doctorId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(updateDoctorSchema),
    doctorController.updateDoctor
  )
  .delete(
    "/delete/:doctorId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    doctorController.deleteDoctor
  )
  .delete(
    "/delete",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    doctorController.deleteAllDoctors
  );

module.exports = doctorRouter;
