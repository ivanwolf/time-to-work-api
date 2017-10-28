class CustomError extends Error {
  constructor(message, status = 404,...props){
    super(props);
    Error.captureStackTrace(this, CustomError);
    this.message = message;
    this.status = status;
  }
}

module.exports = CustomError;
