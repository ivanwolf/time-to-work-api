class NotFoundError extends Error {
  constructor(props) {
    super(props);
    Error.captureStackTrace(this, NotFoundError);
  }
}

class ValidationError extends Error {
  constructor(field, ...props) {
    super(props);
    Error.captureStackTrace(this, NotFoundError);
    this.field = field;
  }
}

class ConflictError extends Error {
  constructor(field, ...props) {
    super(props);
    Error.captureStackTrace(this, NotFoundError);
    this.field = field;
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  ConflictError,
};
