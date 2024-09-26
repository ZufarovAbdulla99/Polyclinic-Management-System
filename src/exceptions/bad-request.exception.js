const BaseException = require("./base.exception");

class BadRequestException extends BaseException {
  constructor(message) {
    super();
    this.statusCode = 400;
    this.name = "Bad Request Exception";
    this.message = message;
  }
}

module.exports = BadRequestException