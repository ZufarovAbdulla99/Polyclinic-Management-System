const {Router} = require("express")
const specialityController = require("../controllers/speciality.controller")
const ValidationMiddleware = require("../middlewares/validation.middleware")
const createSpecialitySchema = require("../dtos/speciality-create.dto")
const updateSpecialitySchema = require("../dtos/speciality-update.dto")

const specialityRouter = Router()

specialityRouter
    .get("/:specialityId", specialityController.getSpeciality)
    .get("/", specialityController.getAllSpecialities)
    .post("/add", ValidationMiddleware(createSpecialitySchema), specialityController.createSpeciality)
    .patch("/update/:specialityId", ValidationMiddleware(updateSpecialitySchema), specialityController.updateSpeciality)
    .delete("/delete/:specialityId", specialityController.deleteSpeciality)
    .delete("/delete/", specialityController.deleteAllSpecialities)

module.exports = specialityRouter