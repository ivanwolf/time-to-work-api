
exports.up = (knex, Promise) => {
  return knex.schema.createTable('records', (table) => {
    table.increments();

    table.boolean('completed')
      .defaultTo(false);

    table.date('date').defaultTo(knex.fn.now());
    table.time('started_time').defaultTo(knex.fn.now());
    table.time('finished_time').defaultTo(null);

    table.integer('user_id').notNullable();
    table.foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('records');
};
