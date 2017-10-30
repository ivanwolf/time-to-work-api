const paramParser = require('../utils/parseBody');

const paramsHandler = (fields) => async (ctx, next) => {
  console.log('body', ctx.request.body);
  ctx.params = paramParser(ctx.request.body, fields);
  await next();
};

module.exports = paramsHandler;

