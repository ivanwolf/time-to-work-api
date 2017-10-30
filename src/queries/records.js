const queries = (knex) => {
  const getAll = async () => (
    knex('records').select()
  );
  const getRecords = async userId => {
    console.log(userId);
    return (
      knex('records').select().where({
        'user_id': userId,
      })
    );
  };
  return {
    getRecords,
    getAll,
  };
};

module.exports = async (ctx, next) => {
  ctx.queries = queries(ctx.knex);
  await next();
};
