const {UserNotFoundError} = require('../utils/errors');
/*
  Validate User:
  Arroja error si es que para una request entregamos un usuario que no existe.
  key: es la llave que usamos para obtener el id, típicamente es 'user_id' o 'id
  Si es que encuentra el usuario, lo deja en el estado
*/

module.exports = key => {
  return async (ctx, next) => {
    const id = key ? ctx.params[key] : ctx.params.user_id;
    const user = await ctx.knex('users')
      .first()
      .where({id});
    if (user === undefined) {
      throw new UserNotFoundError('User not found');
    } else {
      ctx.state.user = user;
    }
    await next();
  };
};
