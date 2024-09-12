const {Router} = require("express")
const scheduleController = require("../controllers/schedule.controller")
const ValidationMiddleware = require("../middlewares/validation.middleware")
const createScheduleSchema = require("../dtos/schedule-create.dto")
const updateScheduleSchema = require("../dtos/schedule-update.dto")

const scheduleRouter = Router()

scheduleRouter
    .get("/:scheduleId", scheduleController.getSchedule)
    .get("/", scheduleController.getAllSchedules)
    .post("/add", ValidationMiddleware(createScheduleSchema), scheduleController.createSchedule)
    .patch("/update/:scheduleId", ValidationMiddleware(updateScheduleSchema), scheduleController.updateSchedule)
    .delete("/delete/:scheduleId", scheduleController.deleteSchedule)
    .delete("/delete/", scheduleController.deleteAllSchedules)

module.exports = scheduleRouter