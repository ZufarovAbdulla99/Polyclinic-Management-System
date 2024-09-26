const { Router } = require("express");
const diagnoseController = require("./diagnose.controller");
const ValidationMiddleware = require("../../middlewares/validation.middleware");
const createDiagnoseSchema = require("./dtos/diagnose-create.dto");
const updateDiagnoseSchema = require("./dtos/diagnose-update.dto");
const CheckAuthGuard = require("../../guards/check-auth.guard");
const CheckRolesGuard = require("../../guards/check-role.guard");

const diagnoseRouter = Router();

diagnoseRouter
  .get(
    "/:diagnoseId",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    diagnoseController.getDiagnose
  )
  .get(
    "/",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    diagnoseController.getAllDiagnoses
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(createDiagnoseSchema),
    diagnoseController.createDiagnose
  )
  .patch(
    "/update/:diagnoseId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(updateDiagnoseSchema),
    diagnoseController.updateDiagnose
  )
  .delete(
    "/delete/:diagnoseId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    diagnoseController.deleteDiagnose
  )
  .delete(
    "/delete/",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    diagnoseController.deleteAllDiagnoses
  );

module.exports = diagnoseRouter;
