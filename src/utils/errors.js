class NotFoundError extends Error {
  constructor(props) {
    super(props);
    Error.captureStackTrace(this, NotFoundError);
  }
}

class ValidationError extends Error {
  constructor(props) {
    super(props);
    Error.captureStackTrace(this, ValidationError);
  }
}

class ConflictError extends Error {
  constructor(props) {
    super(props);
    Error.captureStackTrace(this, ConflictError);
  }
}

class MissingParameterError extends Error {
  constructor(props) {
    super(props);
    Error.captureStackTrace(this, MissingParameterError);
  }
}

class UserNotFoundError extends Error {
  constructor(props) {
    super(props);
    Error.captureStackTrace(this, UserNotFoundError);
  };
}

module.exports = {
  NotFoundError,
  ValidationError,
  ConflictError,
  MissingParameterError,
  UserNotFoundError,
};
