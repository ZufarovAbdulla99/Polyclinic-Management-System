const { Router } = require("express");
const scheduleController = require("./schedule.controller");
const ValidationMiddleware = require("../../middlewares/validation.middleware");
const createScheduleSchema = require("./dtos/schedule-create.dto");
const updateScheduleSchema = require("./dtos/schedule-update.dto");
const CheckAuthGuard = require("../../guards/check-auth.guard");
const CheckRolesGuard = require("../../guards/check-role.guard");

const scheduleRouter = Router();

scheduleRouter
  .get(
    "/:scheduleId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    scheduleController.getSchedule
  )
  .get(
    "/",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    scheduleController.getAllSchedules
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(createScheduleSchema),
    scheduleController.createSchedule
  )
  .patch(
    "/update/:scheduleId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    ValidationMiddleware(updateScheduleSchema),
    scheduleController.updateSchedule
  )
  .delete(
    "/delete/:scheduleId",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    scheduleController.deleteSchedule
  )
  .delete(
    "/delete/",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    scheduleController.deleteAllSchedules
  );

module.exports = scheduleRouter;
