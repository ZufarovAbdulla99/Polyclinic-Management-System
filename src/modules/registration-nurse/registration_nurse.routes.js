const { Router } = require("express");
const registration_nurseController = require("./registration_nurse.controller");
const ValidationMiddleware = require("../../middlewares/validation.middleware");
const createRegNurseSchema = require("./dtos/reg_nurse-create.dto");
const updateRegNurseSchema = require("./dtos/reg_nurse-update.dto");
const CheckAuthGuard = require("../../guards/check-auth.guard");
const CheckRolesGuard = require("../../guards/check-role.guard");

const RegistrationNurseRouter = Router();

RegistrationNurseRouter.get(
  "/:registrationNurseId",
  CheckAuthGuard(true),
  CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
  registration_nurseController.getRegistrationNurse
)
  .get(
    "/",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    registration_nurseController.getAllRegistrationNurses
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(createRegNurseSchema),
    registration_nurseController.createRegistrationNurse
  )
  .patch(
    "/update/:registrationNurseId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(updateRegNurseSchema),
    registration_nurseController.updateRegistrationNurse
  )
  .delete(
    "/delete/:registrationNurseId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    registration_nurseController.deleteRegistrationNurse
  )
  .delete(
    "/delete",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    registration_nurseController.deleteAllRegistrationNurses
  );

module.exports = RegistrationNurseRouter;
