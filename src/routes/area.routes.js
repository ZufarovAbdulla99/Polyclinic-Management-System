const {Router} = require("express")
const areaController = require("../controllers/area.controller")
const ValidationMiddleware = require("../middlewares/validation.middleware")
const createAreaSchema = require("../dtos/area-create.dto")
const updateAreaSchema = require("../dtos/area-update.dto")

const areaRouter = Router()

areaRouter
    .get("/:areaId", areaController.getArea)
    .get("/", areaController.getAllArea)
    .post("/add", ValidationMiddleware(createAreaSchema), areaController.createArea)
    .patch("/update/:areaId", ValidationMiddleware(updateAreaSchema), areaController.updateArea)
    .delete("/delete/:areaId", areaController.deleteArea)
    .delete("/delete", areaController.deleteAllArea)

module.exports = areaRouter