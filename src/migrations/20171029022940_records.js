
exports.up = (knex, Promise) => {
  return knex.schema.createTable('records', (table) => {
    table.increments();

    table.boolean('completed')
      .defaultTo(false);

    table.timestamp('started_at')
      .defaultTo(knex.fn.now());

    table.timestamp('finished_at')
      .defaultTo(null);

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
