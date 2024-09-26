const { isValidObjectId } = require("mongoose");
const Nurse = require("./nurse");
const ApiFeature = require("../../utils/api-feature");

class NurseController {
    #_nurseModel;

    constructor() {
        this.#_nurseModel = Nurse;
    }

    getNurse = async (req, res, next) => {
        try {
            const nurseId = req.params?.nurseId


            this.#_checkObjectId(nurseId)

            const result = await this.#_check_if_exists_document(nurseId)

            if (!result) {
                return res.status(404).send({
                    message: "nurse not found",
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

    getAllNurses = async (req, res, next) => {
        try {
            // Filtersiz chiqarish
            // const allDoctors = await this.#_doctorModel.find();

            // res.send({
            //     message: "Success",
            //     results: allDoctors.length,
            //     data: allDoctors,
            // });

            // Filter bilan ishlash
            const query = { ...req.query }

            // GET ALL FILTERED DOCTORS COUNT
            const AllResultsCount = await new ApiFeature(
                this.#_nurseModel.find(),
                query
            )
                .filter()
                .sort("first_name")
                .limitFields()
                .getQuery()
                .countDocuments();

            // Execute Query
            const AllFilteredNurses = await new ApiFeature(
                this.#_nurseModel.find(),
                query
            )
                .filter()
                .sort("first_name")
                .limitFields()
                .paginate()
                .getQuery()
                .populate([
                    { path: "schedule_id", select: "-_id -__v" },
                    { path: "speciality_id", select: "-_id -__v" },
                    { path: "area_id", select: "-_id -__v" }
                ])

            res.status(200).send({
                message: "success",
                page: req.query?.page || 0,
                limit: req.query?.limit || 10,
                results: AllResultsCount,
                data: AllFilteredNurses
            })

        } catch (error) {
            next(error);
        }
    };

    createNurse = async (req, res, next) => {
        try {
            const { first_name, last_name, birth_date, address, phone, passport, date_of_recruitment, schedule_id, speciality_id, area_id, role } = req.body;

            const newNurse = this.#_nurseModel.create({
                first_name,
                last_name,
                birth_date,
                address,
                phone,
                passport,
                date_of_recruitment,
                schedule_id,
                speciality_id,
                area_id,
                role
            });

            res.status(201).send({
                message: "successfully created nurse",
            })
        } catch (error) {
            next(error);
        }
    }

    updateNurse = async (req, res, next) => {
        try {

            const nurseId = req.params.nurseId
            const { first_name, last_name, birth_date, address, phone, passport, date_of_recruitment, schedule_id, speciality_id, area_id, role } = req.body;

            this.#_checkObjectId(nurseId)

            const selectedNurse = await this.#_check_if_exists_document(nurseId)

            if (!selectedNurse) {
                return res.status(404).send({
                    message: "nurse not found",
                })
            }

            const updatedNurse = await this.#_nurseModel.findByIdAndUpdate(
                nurseId,
                {
                    $set: {
                        ...req.body
                    }
                }
            );

            res.status(201).send({
                message: "successfully updated nurse",
            })

        } catch (error) {
            next(error);
        }
    }

    deleteNurse = async (req, res, next) => {
        try {
            const nurseId = req.params?.nurseId;

            this.#_checkObjectId(nurseId);

            const result = await this.#_nurseModel.findByIdAndDelete(nurseId);

            if (!result) {
                return res.status(404).send({
                    message: "nurse not found"
                })
            }

            res.status(200).send({
                message: "successfully deleted nurse",
            });

        } catch (error) {
            next(error);
        }
    };

    deleteAllNurses = async (req, res, next) => {
        try {
            const result = await this.#_nurseModel.deleteMany({});

            if (!result.deletedCount) {
                return res.status(404).send({
                    message: "not a single nurse was found"
                })
            }

            res.status(200).send({
                message: "successfully deleted nurses",
            });

        } catch (error) {
            next(error);
        }
    };

    #_checkObjectId = (id) => {
        if (!isValidObjectId(id)) {
            throw new Error(`Id: ${id} is not a valid object id`)
        }

        return null;
    }

    #_check_if_exists_document = async (id) => {
        const foundedNurse = await this.#_nurseModel.findById(id).populate([
            { path: "schedule_id", select: "-_id -__v" },
            { path: "speciality_id", select: "-_id -__v" },
            { path: "area_id", select: "-_id -__v" }
        ])

        if (!foundedNurse) {
            return false
        }
        return foundedNurse
    }
}

module.exports = new NurseController();