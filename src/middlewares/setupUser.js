const {UserNotFoundError} = require('../utils/errors');
module.exports = async (ctx, next) => {
  const user = await ctx.queries.getUserById(ctx.params.user_id);
  if (user === undefined) {
    throw new UserNotFoundError(ctx.params.user_id);
  }
  await next();
};
