const jwt = require("jsonwebtoken");
const BadRequestException = require("../exceptions/bad-request.exception");
const { verifyToken } = require("../helpers/jwt.helper");

const CheckAuthGuard = (isProtected) => {
  return (req, _, next) => {
    //   console.log("*", isProtected);
    // if(req.originalUrl === "/api/v1/auth/login"){
    //     isProtected = false
    //     console.log("*", isProtected)
    // }
    if (!isProtected) {
      next();
    }

    const token = req.headers["authorization"];

    // console.log(token);

    if (!(token && token.startsWith("Bearer") && token.split(" ")[1])) {
      if(!token){
        throw new BadRequestException(`You don't have a token`)
      }
      throw new BadRequestException(`Given token: ${token} is invalid`);
    }

    const accessToken = token.split(" ")[1];

    // Verify access token
    verifyToken(accessToken);

    const { id, role } = jwt.decode(accessToken);

    // SET ID AND ROLE TO REQUEST OBJECT
    req.userId = id;
    req.role = role;

    next();
  };
};

module.exports = CheckAuthGuard;
