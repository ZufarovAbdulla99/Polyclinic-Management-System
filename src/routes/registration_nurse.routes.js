const { Router } = require("express");
const registration_nurseController = require("../controllers/registration_nurse.controller");
const ValidationMiddleware = require("../middlewares/validation.middleware");
const createRegNurseSchema = require("../dtos/reg_nurse-create.dto");
const updateRegNurseSchema = require("../dtos/reg_nurse-update.dto");

const RegistrationNurseRouter = Router()

RegistrationNurseRouter
    .get("/:registrationNurseId", registration_nurseController.getRegistrationNurse)
    .get("/", registration_nurseController.getAllRegistrationNurses)
    .post("/add", ValidationMiddleware(createRegNurseSchema), registration_nurseController.createRegistrationNurse)
    .patch("/update/:registrationNurseId", ValidationMiddleware(updateRegNurseSchema), registration_nurseController.updateRegistrationNurse)
    .delete("/delete/:registrationNurseId", registration_nurseController.deleteRegistrationNurse)
    .delete("/delete", registration_nurseController.deleteAllRegistrationNurses)

module.exports = RegistrationNurseRouter