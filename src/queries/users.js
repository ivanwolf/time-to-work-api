const queries = (knex) => {
  const getUsers = async () => (
    knex('users').select()
  );

  const getUserById = async id => (
    knex('users')
      .first()
      .where({
        id,
      })
  );

  const getUserByUsername = async username => (
    knex('users')
      .first()
      .where({
        username,
      })
  );

  const createUser = async (params) => (
    knex('users')
      .insert(params)
      .returning(['id', 'username'])
      .then(res => res[0])
  );

  return {
    getUsers,
    getUserById,
    getUserByUsername,
    createUser,
  };
};

module.exports = async (ctx, next) => {
  ctx.queries = queries(ctx.knex);
  await next();
};


