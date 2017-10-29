const {UniqueConstraintError, ValidationError} = require('sequelize');
const NotFoundError = require('./notFoundError');

const errorHandler = resource => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log(error);
    if (error instanceof UniqueConstraintError) {
      ctx.status = 409;
      ctx.body = {
        error: `${resource} already exists`,
      };
    }
    if (error instanceof ValidationError) {
      ctx.status = 422;
      ctx.body = {
        error: 'Validation error',
      };
    }
    if (error instanceof NotFoundError) {
      ctx.status = 404;
      ctx.body = {
        error: `${resource} not found`,
      };
    }
  }
};

module.exports = errorHandler;
