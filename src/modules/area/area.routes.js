const { Router } = require("express");
const areaController = require("./area.controller");
const ValidationMiddleware = require("../../middlewares/validation.middleware");
const createAreaSchema = require("./dtos/area-create.dto");
const updateAreaSchema = require("./dtos/area-update.dto");
const CheckAuthGuard = require("../../guards/check-auth.guard");
const CheckRolesGuard = require("../../guards/check-role.guard");

const areaRouter = Router();

areaRouter
  .get(
    "/:areaId",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    areaController.getArea
  )
  .get(
    "/",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    areaController.getAllArea
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(createAreaSchema),
    areaController.createArea
  )
  .patch(
    "/update/:areaId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(updateAreaSchema),
    areaController.updateArea
  )
  .delete(
    "/delete/:areaId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    areaController.deleteArea
  )
  .delete(
    "/delete",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    areaController.deleteAllArea
  );

module.exports = areaRouter;
