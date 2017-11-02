const {
  NotFoundError,
  ValidationError,
  ConflictError,
  MissingParameterError,
  UserNotFoundError,
} = require('../utils/errors');

const setResponse = (ctx, error) => {
  if (error instanceof ConflictError) {
    ctx.status = 409;
  } else if (error instanceof ValidationError) {
    ctx.status = 422;
  } else if (error instanceof NotFoundError) {
    ctx.status = 404;
  } else if (error instanceof MissingParameterError) {
    ctx.status = 422;
  } else if (error instanceof UserNotFoundError) {
    ctx.status = 404;
  }
  ctx.body = {
    error: error.message,
  };
};

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    setResponse(ctx, error);
  }
};

module.exports = errorHandler;
