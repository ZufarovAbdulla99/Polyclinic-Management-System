const { Router } = require("express");
const VisitController = require("./visit.controller");
const ValidationMiddleware = require("../../middlewares/validation.middleware");
const createVisitSchema = require("./dtos/visit-create.dto");
const updateVisitSchema = require("./dtos/visit-update.dto");
const CheckAuthGuard = require("../../guards/check-auth.guard");
const CheckRolesGuard = require("../../guards/check-role.guard");

const visitRouter = Router();

visitRouter
  .get(
    "/:visitId",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    VisitController.getVisit
  )
  .get(
    "/",
    CheckAuthGuard(true),
    CheckRolesGuard("doctor", "nurse", "registration_nurse", "admin"),
    VisitController.getAllVisits
  )
  .post(
    "/add",
    CheckAuthGuard(true),
    CheckRolesGuard("registration_nurse", "admin"),
    ValidationMiddleware(createVisitSchema),
    VisitController.createVisit
  )
  .patch(
    "/update/:visitId",
    CheckAuthGuard(true),
    CheckRolesGuard("registration_nurse", "admin"),
    ValidationMiddleware(updateVisitSchema),
    VisitController.updateVisit
  )
  .delete(
    "/delete/:visitId",
    CheckAuthGuard(true),
    CheckRolesGuard("registration_nurse", "admin"),
    VisitController.deleteVisit
  )
  .delete(
    "/delete/",
    CheckAuthGuard(true),
    CheckRolesGuard("admin"),
    VisitController.deleteAllVisits
  );

module.exports = visitRouter;
