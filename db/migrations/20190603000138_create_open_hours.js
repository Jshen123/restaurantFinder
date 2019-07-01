exports.up = function(knex, Promise) {
  return knex.schema.createTable("open_hours", (table) => {
    table.increments('restaurant_id');
    table.string('sunday');
    table.string('monday');
    table.string('tuesday');
    table.string('wednesday');
    table.string('thursday');
    table.string('friday');
    table.string('saturday');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('open_hours');
};