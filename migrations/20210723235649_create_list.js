
exports.up = function(knex) {
  return knex.schema.createTable('list', table => {
    table.increments('id'); // adds an auto incrementing PK column
    table.string('task').notNullable();
    table.string('status').notNullable().defaultTo('incomplete');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('list');
};

