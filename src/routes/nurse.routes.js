const { Router } = require("express");
const nurseController = require("../controllers/nurse.controller");
const ValidationMiddleware = require("../middlewares/validation.middleware");
const createNurseSchema = require("../dtos/nurse-create.dto");
const updateNurseSchema = require("../dtos/nurse-update.dto");

const nurseRouter = Router()

nurseRouter
    .get("/:nurseId", nurseController.getNurse)
    .get("/", nurseController.getAllNurses)
    .post("/add", ValidationMiddleware(createNurseSchema), nurseController.createNurse)
    .patch("/update/:nurseId", ValidationMiddleware(updateNurseSchema), nurseController.updateNurse)
    .delete("/delete/:nurseId", nurseController.deleteNurse)
    .delete("/delete", nurseController.deleteAllNurses)

module.exports = nurseRouter