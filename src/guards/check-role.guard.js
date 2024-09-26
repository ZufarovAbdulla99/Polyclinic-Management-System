const ConflictException = require("../exceptions/conflict.exception.js");

const CheckRolesGuard = (...roles) => {
  return (req, _, next) => {
    // console.log(roles, req.role)
    if (!roles.length) {
      return next();
    }
    if (!roles.includes(req.role)) {
      throw new ConflictException(
        `User don't have access to url: ${req.url} with method: ${req.method}`
      );
    }
    next();
  };
};

module.exports = CheckRolesGuard