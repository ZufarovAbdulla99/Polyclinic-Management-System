const {Router} = require("express")
const diagnoseController = require("../controllers/diagnose.controller")
const ValidationMiddleware = require("../middlewares/validation.middleware")
const createDiagnoseSchema = require("../dtos/diagnose-create.dto")
const updateDiagnoseSchema = require("../dtos/diagnose-update.dto")

const diagnoseRouter = Router()

diagnoseRouter
    .get("/:diagnoseId", diagnoseController.getDiagnose)
    .get("/", diagnoseController.getAllDiagnoses)
    .post("/add", ValidationMiddleware(createDiagnoseSchema), diagnoseController.createDiagnose)
    .patch("/update/:diagnoseId", ValidationMiddleware(updateDiagnoseSchema), diagnoseController.updateDiagnose)
    .delete("/delete/:diagnoseId", diagnoseController.deleteDiagnose)
    .delete("/delete/", diagnoseController.deleteAllDiagnoses)

module.exports = diagnoseRouter