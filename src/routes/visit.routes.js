const {Router} =require("express")
const VisitController = require("../controllers/visit.controller")
const ValidationMiddleware = require("../middlewares/validation.middleware")
const createVisitSchema = require("../dtos/visit-create.dto")
const updateVisitSchema = require("../dtos/visit-update.dto")

const visitRouter = Router()

visitRouter
    .get("/:visitId", VisitController.getVisit)
    .get("/", VisitController.getAllVisits)
    .post("/add", ValidationMiddleware(createVisitSchema), VisitController.createVisit)
    .patch("/update/:visitId",ValidationMiddleware(updateVisitSchema),  VisitController.updateVisit)
    .delete("/delete/:visitId", VisitController.deleteVisit)
    .delete("/delete/", VisitController.deleteAllVisits)

module.exports = visitRouter