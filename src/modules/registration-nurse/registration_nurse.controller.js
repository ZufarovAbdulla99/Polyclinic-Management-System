const { isValidObjectId } = require("mongoose");
const ApiFeature = require("../../utils/api-feature");
const Registration_nurse = require("./registration_nurse");

class RegistrationNurseController {
    #_registrationNurseModel;

    constructor() {
        this.#_registrationNurseModel = Registration_nurse;
    }

    getRegistrationNurse = async (req, res, next) => {
        try {
            const registrationNurseId = req.params?.registrationNurseId


            this.#_checkObjectId(registrationNurseId)

            const result = await this.#_check_if_exists_document(registrationNurseId)

            if (!result) {
                return res.status(404).send({
                    message: "registration nurse not found",
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

    getAllRegistrationNurses = async (req, res, next) => {
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
                this.#_registrationNurseModel.find(),
                query
            )
                .filter()
                .sort("first_name")
                .limitFields()
                .getQuery()
                .countDocuments();

            // Execute Query
            const AllFilteredRegistrationNurses = await new ApiFeature(
                this.#_registrationNurseModel.find(),
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
                ])

            res.status(200).send({
                message: "success",
                page: req.query?.page || 0,
                limit: req.query?.limit || 10,
                results: AllResultsCount,
                data: AllFilteredRegistrationNurses
            })

        } catch (error) {
            next(error);
        }
    };

    createRegistrationNurse = async (req, res, next) => {
        try {
            const { first_name, last_name, birth_date, address, phone, passport, date_of_recruitment, schedule_id, speciality_id, role } = req.body;

            const newNurse = this.#_registrationNurseModel.create({
                first_name,
                last_name,
                birth_date,
                address,
                phone,
                passport,
                date_of_recruitment,
                schedule_id,
                speciality_id,
                role
            });

            res.status(201).send({
                message: "successfully created registration nurse",
            })
        } catch (error) {
            next(error);
        }
    }

    updateRegistrationNurse = async (req, res, next) => {
        try {

            const registrationNurseId = req.params.registrationNurseId
            const { first_name, last_name, birth_date, address, phone, passport, date_of_recruitment, schedule_id, speciality_id, role } = req.body;

            this.#_checkObjectId(registrationNurseId)

            const selectedRegistrationNurse = await this.#_check_if_exists_document(registrationNurseId)

            if (!selectedRegistrationNurse) {
                return res.status(404).send({
                    message: "registration nurse not found",
                })
            }

            const updatedRegistrationNurse = await this.#_registrationNurseModel.findByIdAndUpdate(
                registrationNurseId,
                {
                    $set: {
                        ...req.body
                    }
                }
            );

            res.status(201).send({
                message: "successfully updated registration nurse",
            })

        } catch (error) {
            next(error);
        }
    }

    deleteRegistrationNurse = async (req, res, next) => {
        try {
            const registrationNurseId = req.params?.registrationNurseId;

            this.#_checkObjectId(registrationNurseId);

            const result = await this.#_registrationNurseModel.findByIdAndDelete(registrationNurseId);

            if (!result) {
                return res.status(404).send({
                    message: "registration nurse not found"
                })
            }

            res.status(200).send({
                message: "successfully deleted registration nurse",
            });

        } catch (error) {
            next(error);
        }
    };

    deleteAllRegistrationNurses = async (req, res, next) => {
        try {
            const result = await this.#_registrationNurseModel.deleteMany({});

            if (!result.deletedCount) {
                return res.status(404).send({
                    message: "not a single registration nurse was found"
                })
            }

            res.status(200).send({
                message: "successfully deleted registration nurses",
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
        const foundedNurse = await this.#_registrationNurseModel.findById(id).populate([
            { path: "schedule_id", select: "-_id -__v" },
            { path: "speciality_id", select: "-_id -__v" },
        ])

        if (!foundedNurse) {
            return false
        }
        return foundedNurse
    }
}

module.exports = new RegistrationNurseController();