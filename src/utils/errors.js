class NotFoundError extends Error {
  constructor(props) {
    super(props);
    Error.captureStackTrace(this, NotFoundError);
  }
}

class ValidationError extends Error {
  constructor(field, ...props) {
    super(props);
    Error.captureStackTrace(this, ValidationError);
    this.field = field;
  }
}

class ConflictError extends Error {
  constructor(field, ...props) {
    super(props);
    Error.captureStackTrace(this, ConflictError);
    this.field = field;
  }
}

class MissingParameterError extends Error {
  constructor(field, ...props) {
    super(props);
    Error.captureStackTrace(this, MissingParameterError);
    this.field = field;
  }
}

class UserNotFoundError extends Error {
  constructor(user_id, ...props) {
    super(props);
    Error.captureStackTrace(this, UserNotFoundError);
    this.user_id = user_id;
  };
}

module.exports = {
  NotFoundError,
  ValidationError,
  ConflictError,
  MissingParameterError,
  UserNotFoundError,
};
