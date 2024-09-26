const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");
const BadRequestException = require("../exceptions/bad-request.exception");
const TokenExpiredException = require("../exceptions/token-expired.exception");

const signToken = (tokenData) =>
  jwt.sign(tokenData, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expireTime,
  });

const verifyToken = (token) =>
  jwt.verify(token, jwtConfig.secretKey, (err, _) => {
    if (err && err instanceof jwt.JsonWebTokenError) {
      throw new BadRequestException("Invalid JWT token");
    }
    if (err && err instanceof jwt.NotBeforeError) {
      throw new BadRequestException("Not before JWT error");
    }
    if (err && err instanceof jwt.TokenExpiredError) {
      throw new TokenExpiredException("Token already expired");
    }
  });

module.exports = { signToken, verifyToken };
