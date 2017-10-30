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
    ctx.body = {
      error: `Conflict error: ${error.field} has already been taken`,
    };
  }
  if (error instanceof ValidationError) {
    ctx.status = 422;
    ctx.body = {
      error: `Validation error: ${error.field} can not be empty`,
    };
  }

  if (error instanceof NotFoundError) {
    ctx.status = 404;
    ctx.body = {
      error: `${resource} not found`,
    };
  }

  if (error instanceof MissingParameterError) {
    ctx.status = 422;
    ctx.body = {
      error: `Missing required param ${error.field}`,
    };
  }

  if (error instanceof UserNotFoundError) {
    ctx.status = 422;
    ctx.body = {
      error: `User with id ${error.user_id} does not exists`,
    };
  }
};

const errorHandler = resource => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    setResponse(ctx, error);
  }
};

module.exports = errorHandler;
