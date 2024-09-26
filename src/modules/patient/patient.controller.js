const fs = require("fs");
const path = require("path");
const { isValidObjectId } = require("mongoose");
const ApiFeature = require("../../utils/api-feature");
const Patient = require("./patient");

class PatientController {
  #_patientModel;

  constructor() {
    this.#_patientModel = Patient;
  }

  getPatient = async (req, res, next) => {
    try {
      const patientId = req.params?.patientId;

      this.#_checkObjectId(patientId);

      const result = await this.#_check_if_exists_document(patientId);

      if (!result) {
        return res.status(404).send({
          message: "patient not found",
        });
      }

      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllPatients = async (req, res, next) => {
    try {
      // Filtersiz chiqarish
      // const allDoctors = await this.#_doctorModel.find();

      // res.send({
      //     message: "Success",
      //     results: allDoctors.length,
      //     data: allDoctors,
      // });

      // Filter bilan ishlash
      const query = { ...req.query };

      // GET ALL FILTERED PATIENTS COUNT
      const AllResultsCount = await new ApiFeature(
        this.#_patientModel.find(),
        query
      )
        .filter()
        .sort("first_name")
        .limitFields()
        .getQuery()
        .countDocuments();

      // Execute Query
      const AllFilteredDoctors = await new ApiFeature(
        this.#_patientModel.find(),
        query
      )
        .filter()
        .sort("first_name")
        .limitFields()
        .paginate()
        .getQuery()
        .populate({ path: "area_id", select: "-_id -__v" });

      res.status(200).send({
        message: "success",
        page: req.query?.page || 0,
        limit: req.query?.limit || 10,
        results: AllResultsCount,
        data: AllFilteredDoctors,
      });
    } catch (error) {
      next(error);
    }
  };

  createPatient = async (req, res, next) => {
    try {
      const {
        first_name,
        last_name,
        birth_date,
        address,
        phone,
        passport,
        area_id,
      } = req.body;

      const image_url = req.files[0]?.filename;
      // console.log(image_url)
      const newPatient = this.#_patientModel.create({
        first_name,
        last_name,
        birth_date,
        address,
        phone,
        passport,
        area_id,
        image_url,
      });

      res.status(201).send({
        message: "successfully created patient",
      });
    } catch (error) {
      next(error);
    }
  };

  updatePatient = async (req, res, next) => {
    try {
      const patientId = req.params.patientId;
      const {
        first_name,
        last_name,
        birth_date,
        address,
        phone,
        passport,
        area_id,
      } = req.body;
      // console.log(req.body)
      this.#_checkObjectId(patientId);

      const selectedPatient = await this.#_check_if_exists_document(patientId);

      if (!selectedPatient) {
        return res.status(404).send({
          message: "patient not found",
        });
      }

      let updatedImage = selectedPatient.image_url;
      // console.log(updatedImage)
      if (req.files.length > 0) {
        updatedImage = req.files[0].filename;
        fs.unlink(
          path.join(process.cwd(), "uploads", selectedPatient.image_url),
          (err) => {
            if (err) {
              console.log("Fayl mavjud emas yoki fayl o'chirishda xatolik");
            }
          }
        );
      }

      const updatedPatient = await this.#_patientModel.findByIdAndUpdate(
        patientId,
        {
          $set: {
            first_name,
            last_name,
            birth_date,
            address,
            phone,
            passport,
            area_id,
            image_url: updatedImage,
          },
        }
      );

      res.status(201).send({
        message: "successfully updated patient",
      });
    } catch (error) {
      next(error);
    }
  };

  deletePatient = async (req, res, next) => {
    try {
      const patientId = req.params?.patientId;

      this.#_checkObjectId(patientId);

      // // image_url ini document o'chmasdan oldin o'zgaruvchiga olish pasda unlink metodi orqali faylni o'chiramiz
      const selectedPatientImage_url = await this.#_patientModel
        .findById(patientId)
        .select("image_url");

      const result = await this.#_patientModel.findByIdAndDelete(patientId);

      if (!result) {
        return res.status(404).send({
          message: "patient not found",
        });
      }

      // console.log(selectedPatientImage_url)
      fs.unlink(
        path.join(process.cwd(), "uploads", selectedPatientImage_url.image_url),
        (err) => {
          if (err) {
            console.log("Fayl mavjud emas yoki fayl o'chirishda xatolik");
          }
        }
      );

      res.status(200).send({
        message: "successfully deleted patient",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteAllPatients = async (_, res, next) => {
    try {
      // console.log("sd")
      const allImagesUrl = await this.#_patientModel
        .find({})
        .select("image_url -_id");
    //   console.log(allImagesUrl);
      allImagesUrl.forEach((url) => {
        fs.unlink(path.join(process.cwd(), "uploads", url.image_url), (err) => {
          if (err) {
            console.log("Fayl mavjud emas yoki fayl o'chirishda xatolik");
          }
        });
      });
      const result = await this.#_patientModel.deleteMany({});

      if (!result.deletedCount) {
        return res.status(404).send({
          message: "not a single patient was found",
        });
      }

      res.status(200).send({
        message: "successfully deleted patients",
      });
    } catch (error) {
      next(error);
    }
  };

  #_checkObjectId = (id) => {
    if (!isValidObjectId(id)) {
      throw new Error(`Id: ${id} is not a valid object id`);
    }

    return null;
  };

  #_check_if_exists_document = async (id) => {
    const foundedPatient = await this.#_patientModel
      .findById(id)
      .populate([{ path: "area_id", select: "-_id -__v" }]);

    if (!foundedPatient) {
      return false;
    }
    return foundedPatient;
  };
}

module.exports = new PatientController();
