const queries = (knex) => {
  const getAll = async () => (
    knex('records').select()
  );
  const getRecords = async userId => {
    return (
      knex('records').select().where({
        'user_id': userId,
      })
    );
  };
  const createRecord = async userId => (
    knex('records')
      .insert({
        'user_id': userId,
      })
      .returning(['id', 'user_id', 'started_at', 'finished_at', 'completed'])
      .then(res => res[0])
  );
  return {
    getRecords,
    getAll,
    createRecord,
  };
};

module.exports = async (ctx, next) => {
  ctx.queries = Object.assign({}, ctx.queries, queries(ctx.knex));
  await next();
};
