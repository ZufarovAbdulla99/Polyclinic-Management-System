const { Router } = require("express");
const authController = require("./auth.controller");
const ValidationMiddleware = require("../../middlewares/validation.middleware");
const loginSchema = require("./dtos/login.dto");
const CheckAuthGuard = require("../../guards/check-auth.guard");

const authRoutes = Router();

authRoutes
  .post("/login", ValidationMiddleware(loginSchema), authController.signin)
  .post("/register", ValidationMiddleware(), authController.signup);

module.exports = authRoutes;
