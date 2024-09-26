const { isValidObjectId } = require("mongoose")
const ApiFeature = require("../../utils/api-feature")
const Area = require("./area")

class AreaController {
    #_areaModel

    constructor() {
        this.#_areaModel = Area
    }

    getArea = async (req, res, next) => {
        try {
            const areaId = req.params.areaId

            this.#_checkObjectId(areaId)

            const result = await this.#_check_if_exists_document(areaId)

            if (!result) {
                return res.status(404).send({
                    message: "Area not found"
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

    getAllArea = async (req, res, next) => {
        try {
            // Filter bilan ishlash
            const query = { ... req.query}

            // GET ALL FILTERED AREAS COUNT
            const AllResultsCount = await new ApiFeature(
                this.#_areaModel.find(),
                query
            )
                .filter()
                .sort("name")
                .limitFields()
                .getQuery()
                .countDocuments();

            // Execute Query
            const AllFilteredArea = await new ApiFeature(
                this.#_areaModel.find(),
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
                data: AllFilteredArea
            })
        } catch (error) {
            next(error)
        }
    }

    createArea = async (req, res, next) => {
        try {
            const { name, description, population } = req.body

            const newArea = this.#_areaModel.create({
                name, description, population
            })

            res.status(201).send({
                message: "successfully created area"
            })

        } catch (error) {
            next(error)
        }
    }

    updateArea = async(req, res, next) => {
        try {
            const areaId = req.params.areaId

            this.#_checkObjectId(areaId)

            const selectedArea = await this.#_check_if_exists_document(areaId)

            if(!selectedArea){
                return res.status(404).send({
                    message: "Area not found"
                })
            }

            await this.#_areaModel.findByIdAndUpdate(
                areaId,
                {
                    $set: {
                        ...req.body
                    }
                }
            )

            res.status(200).send({
                message: "successfully updated area"
            })

        } catch (error) {
            next(error)
        }
    }

    deleteArea = async(req, res, next) => {
        try {
            const areaId = req.params.areaId

            this.#_checkObjectId(areaId)

            const result = await this.#_areaModel.findByIdAndDelete(areaId)
            
            if(!result){
                return res.status(404).send({
                    message: "area not found"
                })
            }

            res.status(200).send({
                message: "successfully deleted area"
            })

        } catch (error) {
            next(error)
        }
    }

    deleteAllArea = async (_, res, next) => {
        try {
            const result = await this.#_areaModel.deleteMany({});

            if(!result.deletedCount){
                return res.status(404).send({
                    message: "not a single area was found"
                })
            }
            
            res.status(200).send({
                message: "successfully deleted area",
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
        const foundedArea = await this.#_areaModel.findById(id).select("-__v")

        if (!foundedArea) {
            return false
        }
        return foundedArea
    }

}

module.exports = new AreaController()