class BaseException extends Error {
  constructor() {
    super();
    this.isException = true;
  }
}

module.exports = BaseException
