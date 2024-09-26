const Joi = require("joi");
const Doctor = require("../doctor/doctor.model");
const {verifyToken, signToken} = require("../../helpers/jwt.helper");
const { message } = require("./dtos/login.dto");

class AuthController {
  #_doctorModel;
  constructor() {
    this.#_doctorModel = Doctor;
  }
  // LOGIN
  signin = async (req, res, next) => {
    try {
        // verifyToken(req.headers["authorization"])
        const foundedUser = await this.#_doctorModel.findOne({
        username: req.body.username,
      });

      if (!foundedUser) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      let result = false;
      if (foundedUser.password === req.body.password) {
        result = true;
      }

      if (!result) {
        return res.status(409).send({
          message: "Invalid password",
        });
      }

      const accessToken = signToken({
        id: foundedUser.id,
        role: foundedUser.role
      })

      res.send({
        message: "succes",
        token: accessToken,
      })
    } catch (error) {
      next(error);
    }
  };

  // REGISTER
  signup = async (req, res, next) => {
    res.send("ok");
  };
}

module.exports = new AuthController();
