const { isValidObjectId } = require("mongoose")
const Speciality = require("./speciality")
const ApiFeature = require("../../utils/api-feature")

class SpecialityController {
    #_specialityModel

    constructor() {
        this.#_specialityModel = Speciality
    }

    getSpeciality = async (req, res, next) => {
        try {
            const specialityId = req.params.specialityId

            this.#_checkObjectId(specialityId)

            const result = await this.#_check_if_exists_document(specialityId)

            if (!result) {
                return res.status(404).send({
                    message: "Speciality not found"
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

    getAllSpecialities = async (req, res, next) => {
        try {
            // Filter bilan ishlash
            const query = { ... req.query}

            // GET ALL FILTERED SPECIALITIES COUNT
            const AllResultsCount = await new ApiFeature(
                this.#_specialityModel.find(),
                query
            )
                .filter()
                .sort("name")
                .limitFields()
                .getQuery()
                .countDocuments();

            // Execute Query
            const AllFilteredSpecialities = await new ApiFeature(
                this.#_specialityModel.find(),
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
                data: AllFilteredSpecialities
            })
        } catch (error) {
            next(error);
        }
    }

    createSpeciality = async (req, res, next) => {
        try {
            const { name } = req.body

            const newSpeciality = this.#_specialityModel.create({
                name
            })

            res.status(201).send({
                message: "successfully created speciality"
            })

        } catch (error) {
            next(error);
        }
    }

    updateSpeciality = async(req, res, next) => {
        try {
            const specialityId = req.params.specialityId

            this.#_checkObjectId(specialityId)

            const selectedSpeciality = await this.#_check_if_exists_document(specialityId)

            if(!selectedSpeciality){
                return res.status(404).send({
                    message: "Speciality not found"
                })
            }

            await this.#_specialityModel.findByIdAndUpdate(
                specialityId,
                {
                    $set: {
                        ...req.body
                    }
                }
            )

            res.status(200).send({
                message: "successfully updated speciality"
            })

        } catch (error) {
            next(error);
        }
    }

    deleteSpeciality = async(req, res, next) => {
        try {
            const specialityId = req.params.specialityId

            this.#_checkObjectId(specialityId)

            const result = await this.#_specialityModel.findByIdAndDelete(specialityId)

            if(!result){
                return res.status(400).send({
                    message: "speciality not found"
                })
            }

            res.status(200).send({
                message: "successfully deleted speciality"
            })

        } catch (error) {
            next(error);
        }
    }

    deleteAllSpecialities = async (_, res, next) => {
        try {
            const result = await this.#_specialityModel.deleteMany({});

            if(!result.deletedCount){
                return res.status(404).send({
                    message: "not a single speciality was found"
                })
            }
            
            res.status(200).send({
                message: "successfully deleted specialities",
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
        const foundedSpeciality = await this.#_specialityModel.findById(id)

        if (!foundedSpeciality) {
            return false
        }
        return foundedSpeciality
    }

}

module.exports = new SpecialityController()