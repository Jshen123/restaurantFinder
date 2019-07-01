exports.up = function(knex, Promise) {
  return knex.schema.createTable("open_hours", (table) => {
    table.increments('open_hours_id');
    table.string('sunday');
    table.string('monday');
    table.string('tuesday');
    table.string('wednesday');
    table.string('thursday');
    table.string('friday');
    table.string('saturday');
    table.foreign('open_hours_id').references('restaurants.restaurant_id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('open_hours');
};