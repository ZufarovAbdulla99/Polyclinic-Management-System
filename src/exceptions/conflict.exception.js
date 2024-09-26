const BaseException = require("./base.exception.js")

class ConflictException extends BaseException {
  constructor(message) {
    super();
    this.statusCode = 409;
    this.name = "Conflict Exception";
    this.message = message;
  }
}

module.exports = ConflictException