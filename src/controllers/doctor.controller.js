const { isValidObjectId } = require("mongoose");
const Doctor = require("../models/doctors");
const ApiFeature = require("../utils/api-feature");

class DoctorController {
    #_doctorModel;

    constructor() {
        this.#_doctorModel = Doctor;
    }

    getDoctor = async (req, res, next) => {
        try {
            const doctorId = req.params?.doctorId


            this.#_checkObjectId(doctorId)

            const result = await this.#_check_if_exists_document(doctorId)

            if (!result) {
                return res.status(404).send({
                    message: "doctor not found",
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

    getAllDoctors = async (req, res, next) => {
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
                this.#_doctorModel.find(),
                query
            )
                .filter()
                .sort("first_name")
                .limitFields()
                .getQuery()
                .countDocuments();

            // Execute Query
            const AllFilteredDoctors = await new ApiFeature(
                this.#_doctorModel.find(),
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
                    { path: "area_id", select: "-_id -__v" },

                ])

            res.status(200).send({
                message: "success",
                page: req.query?.page || 0,
                limit: req.query?.limit || 10,
                results: AllResultsCount,
                data: AllFilteredDoctors
            })

        } catch (error) {
            next(error);
        }
    };

    createDoctor = async (req, res, next) => {
        try {
            const { first_name, last_name, birth_date, address, phone, passport, date_of_recruitment, schedule_id, speciality_id, area_id, role } = req.body;

            const newDoctor = this.#_doctorModel.create({
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
                message: "successfully created doctor",
            })
        } catch (error) {
            next(error);
        }
    }

    updateDoctor = async (req, res, next) => {
        try {

            const doctorId = req.params.doctorId
            const { first_name, last_name, birth_date, address, phone, passport, date_of_recruitment, schedule_id, speciality_id, area_id, role } = req.body;

            this.#_checkObjectId(doctorId)

            const selectedDoctor = await this.#_check_if_exists_document(doctorId)

            if (!selectedDoctor) {
                return res.status(404).send({
                    message: "doctor not found",
                })
            }

            const updatedDoctor = await this.#_doctorModel.findByIdAndUpdate(
                doctorId,
                {
                    $set: {
                        ...req.body
                    }
                }
            );

            res.status(201).send({
                message: "successfully updated doctor",
            })

        } catch (error) {
            next(error);
        }
    }

    deleteDoctor = async (req, res, next) => {
        try {
            const doctorId = req.params?.doctorId;

            this.#_checkObjectId(doctorId);

            const result = await this.#_doctorModel.findByIdAndDelete(doctorId);

            if (!result) {
                return res.status(404).send({
                    message: "doctor not found"
                })
            }

            res.status(200).send({
                message: "successfully deleted doctor",
            });

        } catch (error) {
            next(error);
        }
    };

    deleteAllDoctors = async (req, res, next) => {
        try {
            const result = await this.#_doctorModel.deleteMany({});

            if (!result.deletedCount) {
                return res.status(404).send({
                    message: "not a single doctor was found"
                })
            }

            res.status(200).send({
                message: "successfully deleted doctors",
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
        const foundedDoctor = await this.#_doctorModel.findById(id).populate([
            { path: "schedule_id", select: "-_id -__v" },
            { path: "speciality_id", select: "-_id -__v" },
            { path: "schedule_id", select: "-_id -__v" }
        ])

        if (!foundedDoctor) {
            return false
        }
        return foundedDoctor
    }
}

module.exports = new DoctorController();
