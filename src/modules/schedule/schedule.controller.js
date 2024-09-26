const { isValidObjectId } = require("mongoose")
const Schedule = require("./schedule")
const ApiFeature = require("../../utils/api-feature")

class ScheduleController {
    #_scheduleModel

    constructor() {
        this.#_scheduleModel = Schedule
    }

    getSchedule = async (req, res, next) => {
        try {
            const scheduleId = req.params.scheduleId

            this.#_checkObjectId(scheduleId)

            const result = await this.#_check_if_exists_document(scheduleId)

            if (!result) {
                return res.status(404).send({
                    message: "Schedule not found"
                })
            }

            res.status(200).send({
                message: "success",
                data: result
            })
        } catch (error) {
            next(error);
        }
    }

    getAllSchedules = async (req, res, next) => {
        try {
            // Filter bilan ishlash
            const query = { ... req.query}

            // GET ALL FILTERED SCHEDULES COUNT
            const AllResultsCount = await new ApiFeature(
                this.#_scheduleModel.find(),
                query
            )
                .filter()
                .sort("createdAt")
                .limitFields()
                .getQuery()
                .countDocuments();

            // Execute Query
            const AllFilteredSchedules = await new ApiFeature(
                this.#_scheduleModel.find(),
                query
            )
                .filter()
                .sort("createdAt")
                .limitFields()
                .paginate()
                .getQuery()
                .select("-__v")

            res.status(200).send({
                message: "success",
                page: req.query?.page || 0,
                limit: req.query?.limit || 10,
                results: AllResultsCount,
                data: AllFilteredSchedules
            })
        } catch (error) {
            next(error);
        }
    }

    createSchedule = async (req, res, next) => {
        try {
            const { appointment_day, appointment_hour, room_number } = req.body

            const newSchedule = this.#_scheduleModel.create({
                appointment_day,
                appointment_hour,
                room_number
            })

            res.status(201).send({
                message: "successfully created schedule"
            })

        } catch (error) {
            next(error);
        }
    }

    updateSchedule = async(req, res, next) => {
        try {
            const scheduleId = req.params.scheduleId

            this.#_checkObjectId(scheduleId)

            const selectedSchedule = await this.#_check_if_exists_document(scheduleId)

            if(!selectedSchedule){
                return res.status(404).send({
                    message: "Schedule not found"
                })
            }

            await this.#_scheduleModel.findByIdAndUpdate(
                scheduleId,
                {
                    $set: {
                        ...req.body
                    }
                }
            )

            res.status(200).send({
                message: "successfully updated schedule"
            })

        } catch (error) {
            next(error);
        }
    }

    deleteSchedule = async(req, res, next) => {
        try {
            const scheduleId = req.params.scheduleId

            this.#_checkObjectId(scheduleId)

            const result = await this.#_scheduleModel.findByIdAndDelete(scheduleId)

            if(!result){
                return res.status(400).send({
                    message: "schedule not found"
                })
            }

            res.status(200).send({
                message: "successfully deleted schedule"
            })

        } catch (error) {
            next(error);
        }
    }

    deleteAllSchedules = async (_, res, next) => {
        try {
            const result = await this.#_scheduleModel.deleteMany({});

            if(!result.deletedCount){
                return res.status(404).send({
                    message: "not a single schedule was found"
                })
            }
            
            res.status(200).send({
                message: "successfully deleted schedules",
            });

        } catch (error) {
            next(error);
        }
    };


    #_checkObjectId = (id) => {
        if (!isValidObjectId(id)) {
            return res.status(400).send({
                message: "Invalid Object Id"
            })
        }
    }

    #_check_if_exists_document = async (id) => {
        const foundedSchedule = await this.#_scheduleModel.findById(id)

        if (!foundedSchedule) {
            return false
        }
        return foundedSchedule
    }

}

module.exports = new ScheduleController()