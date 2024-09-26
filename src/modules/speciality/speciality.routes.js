const { Router } = require("express");
const specialityController = require("./speciality.controller");
const ValidationMiddleware = require("../../middlewares/validation.middleware");
const createSpecialitySchema = require("./dtos/speciality-create.dto");
const updateSpecialitySchema = require("./dtos/speciality-update.dto");
const CheckAuthGuard = require("../../guards/check-auth.guard");
const CheckRolesGuard = require("../../guards/check-role.guard");

const specialityRouter = Router();

specialityRouter
  .get(
    "/:specialityId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    specialityController.getSpeciality
  )
  .get(
    "/",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    specialityController.getAllSpecialities
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(createSpecialitySchema),
    specialityController.createSpeciality
  )
  .patch(
    "/update/:specialityId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(updateSpecialitySchema),
    specialityController.updateSpeciality
  )
  .delete(
    "/delete/:specialityId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    specialityController.deleteSpeciality
  )
  .delete(
    "/delete/",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    specialityController.deleteAllSpecialities
  );

module.exports = specialityRouter;
