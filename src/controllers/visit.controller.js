const { isValidObjectId } = require("mongoose")
const Visit = require("../models/visit")
const ApiFeature = require("../utils/api-feature")

class VisitController {
    #_visitModel

    constructor() {
        this.#_visitModel = Visit
    }

    getVisit = async (req, res, next) => {
        try {
            const visitId = req.params.visitId

            this.#_checkObjectId(visitId)

            const result = await this.#_check_if_exists_document(visitId)

            if (!result) {
                return res.status(404).send({
                    message: "Visit not found"
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

    getAllVisits = async (req, res, next) => {
        try {
            // Filter bilan ishlash
            const query = { ...req.query }
            // GET ALL FILTERED DOCTORS COUNT
            const AllResultsCount = await new ApiFeature(
                this.#_visitModel.find(),
                query
            )
                .filter()
                .sort("createdAt")
                .limitFields()
                .getQuery()
                .countDocuments();

            // Execute Query
            const AllFilteredVisits = await new ApiFeature(
                this.#_visitModel.find(),
                query
            )
                .filter()
                .sort("createdAt")
                .limitFields()
                .paginate()
                .getQuery()
                .populate([
                    { path: "doctor_id", select: "-_id -__v" },
                    { path: "patient_id", select: "-_id -__v" },
                    { path: "diagnose_id", select: "-_id -__v" }
                ]).select("-__v")

            res.status(200).send({
                message: "success",
                page: req.query?.page || 0,
                limit: req.query?.limit || 10,
                results: AllResultsCount,
                data: AllFilteredVisits
            })
        } catch (error) {
            next(error);
        }
    }

    createVisit = async (req, res, next) => {
        try {
            const { doctor_id, patient_id, diagnose_id, visit_record, examination } = req.body

            const newVisit = this.#_visitModel.create({
                doctor_id,
                patient_id,
                diagnose_id,
                visit_record,
                examination
            })

            res.status(201).send({
                message: "successfully created visit"
            })

        } catch (error) {
            next(error);
        }
    }

    updateVisit = async (req, res, next) => {
        try {
            const visitId = req.params.visitId

            this.#_checkObjectId(visitId)

            const selectedVisit = await this.#_check_if_exists_document(visitId)

            if (!selectedVisit) {
                return res.status(404).send({
                    message: "Visit not found"
                })
            }

            await this.#_visitModel.findByIdAndUpdate(
                visitId,
                {
                    $set: {
                        ...req.body
                    }
                }
            )

            res.status(200).send({
                message: "successfully updated visit"
            })

        } catch (error) {
            next(error);
        }
    }

    deleteVisit = async (req, res, next) => {
        try {
            const visitId = req.params.visitId

            this.#_checkObjectId(visitId)

            const result = await this.#_visitModel.findByIdAndDelete(visitId)

            if (!result) {
                return res.status(400).send({
                    message: "visit not found"
                })
            }

            res.status(200).send({
                message: "successfully deleted visit"
            })

        } catch (error) {
            next(error);
        }
    }

    deleteAllVisits = async (req, res, next) => {
        try {
            const result = await this.#_visitModel.deleteMany({});

            if (!result.deletedCount) {
                return res.status(404).send({
                    message: "not a single visit was found"
                })
            }

            res.status(200).send({
                message: "successfully deleted visits",
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
        const foundedVisit = await this.#_visitModel.findById(id).populate([
            { path: "doctor_id", select: "-_id -__v" },
            { path: "patient_id", select: "-_id -__v" },
            { path: "diagnose_id", select: "-_id -__v" }
        ]).select("-__v")

        if (!foundedVisit) {
            return false
        }
        return foundedVisit
    }

}

module.exports = new VisitController()