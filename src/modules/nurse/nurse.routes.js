const { Router } = require("express");
const nurseController = require("./nurse.controller");
const ValidationMiddleware = require("../../middlewares/validation.middleware");
const createNurseSchema = require("./dtos/nurse-create.dto");
const updateNurseSchema = require("./dtos/nurse-update.dto");
const CheckAuthGuard = require("../../guards/check-auth.guard");
const CheckRolesGuard = require("../../guards/check-role.guard");

const nurseRouter = Router();

nurseRouter
  .get(
    "/:nurseId",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    nurseController.getNurse
  )
  .get(
    "/",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    nurseController.getAllNurses
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(createNurseSchema),
    nurseController.createNurse
  )
  .patch(
    "/update/:nurseId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(updateNurseSchema),
    nurseController.updateNurse
  )
  .delete(
    "/delete/:nurseId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    nurseController.deleteNurse
  )
  .delete(
    "/delete",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    nurseController.deleteAllNurses
  );

module.exports = nurseRouter;
