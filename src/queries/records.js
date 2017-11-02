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

  const getRecordById = async id => (
    knex('records')
    .first()
    .where({
      id,
    })
  );

  const createRecord = async userId => (
    knex('records')
      .insert({
        'user_id': userId,
      })
      .returning(['id', 'user_id', 'date', 'started_time', 'completed', 'finished_time'])
      .then(res => res[0])
  );
  const completeRecord = async id => (
    knex('records')
      .update({
        completed: true,
        'finished_time': knex.fn.now(),
      })
      .where({
        id,
        completed: false,
      })
      .returning(['id', 'user_id', 'date', 'started_time', 'completed', 'finished_time'])
      .then(res => res[0])
  );
  return {
    getRecords,
    getAll,
    getRecordById,
    createRecord,
    completeRecord,
  };
};

module.exports = async (ctx, next) => {
  ctx.queries = Object.assign({}, ctx.queries, queries(ctx.knex));
  await next();
};
