
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').notNullable().unique();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
