const { isValidObjectId } = require("mongoose")
const ApiFeature = require("../utils/api-feature")
const Diagnose = require("../models/diagnose")

class DiagnoseController {
    #_diagnoseModel

    constructor() {
        this.#_diagnoseModel = Diagnose
    }

    getDiagnose = async (req, res, next) => {
        try {
            const diagnoseId = req.params.diagnoseId

            this.#_checkObjectId(diagnoseId)

            const result = await this.#_check_if_exists_document(diagnoseId)

            if (!result) {
                return res.status(404).send({
                    message: "diagnose not found"
                })
            }

            res.status(200).send({
                message: "success",
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    getAllDiagnoses = async (req, res, next) => {
        try {
            // Filter bilan ishlash
            const query = { ... req.query}

            // GET ALL FILTERED DIAGNOSES COUNT
            const AllResultsCount = await new ApiFeature(
                this.#_diagnoseModel.find(),
                query
            )
                .filter()
                .sort("name")
                .limitFields()
                .getQuery()
                .countDocuments();

            // Execute Query
            const AllFilteredDiagnoses = await new ApiFeature(
                this.#_diagnoseModel.find(),
                query
            )
                .filter()
                .sort("name")
                .limitFields()
                .paginate()
                .getQuery()
                .select("-__v")

            res.status(200).send({
                message: "success",
                page: req.query?.page || 0,
                limit: req.query?.limit || 10,
                results: AllResultsCount,
                data: AllFilteredDiagnoses
            })
        } catch (error) {
            next(error)
        }
    }

    createDiagnose = async (req, res, next) => {
        try {
            const { name } = req.body

            const newDiagnose = this.#_diagnoseModel.create({
                name
            })

            res.status(201).send({
                message: "successfully created diagnose"
            })

        } catch (error) {
            next(error)
        }
    }

    updateDiagnose = async(req, res, next) => {
        try {
            const diagnoseId = req.params.diagnoseId

            this.#_checkObjectId(diagnoseId)

            const selectedDiagnose = await this.#_check_if_exists_document(diagnoseId)

            if(!selectedDiagnose){
                return res.status(404).send({
                    message: "diagnose not found"
                })
            }

            await this.#_diagnoseModel.findByIdAndUpdate(
                diagnoseId,
                {
                    $set: {
                        ...req.body
                    }
                }
            )

            res.status(200).send({
                message: "successfully updated diagnose"
            })

        } catch (error) {
            next(error)
        }
    }

    deleteDiagnose = async(req, res, next) => {
        try {
            const diagnoseId = req.params.diagnoseId

            this.#_checkObjectId(diagnoseId)

            const result = await this.#_diagnoseModel.findByIdAndDelete(diagnoseId)

            if(!result){
                return res.status(404).send({
                    message: "diagnose not found"
                })
            }

            res.status(200).send({
                message: "successfully deleted diagnose"
            })

        } catch (error) {
            next(error)
        }
    }

    deleteAllDiagnoses = async (_, res, next) => {
        try {
            const result = await this.#_diagnoseModel.deleteMany({});

            if(!result.deletedCount){
                return res.status(404).send({
                    message: "not a single diagnose was found"
                })
            }
            
            res.status(200).send({
                message: "successfully deleted diagnoses",
            });

        } catch (error) {
            next(error)
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
        const foundedDiagnose = await this.#_diagnoseModel.findById(id).select("-__v")

        if (!foundedDiagnose) {
            return false
        }
        return foundedDiagnose
    }

}

module.exports = new DiagnoseController()