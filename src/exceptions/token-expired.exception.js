const BaseException = require("./base.exception");

class TokenExpiredException extends BaseException {
  constructor(message) {
    super();
    this.statusCode = 499;
    this.name = "Token Expired Exception";
    this.message = message;
  }
}

module.exports = TokenExpiredException
