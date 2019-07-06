
exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", (table) => {
    table.increments('comment_id');
    table.integer('restaurant_id').notNullable();
    table.integer('user_id').notNullable();
    table.timestamp('create_date').defaultTo(knex.fn.now());
    table.string('comment');
    table.integer('rating');
    table.foreign('restaurant_id').references('restaurants.restaurant_id').onDelete('cascade');
    table.foreign('user_id').references('users.user_id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
