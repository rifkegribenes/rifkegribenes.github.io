exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("projects", function(table) {
      table.boolean("featured");
      table.integer("sort_order");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("projects", function(table) {
      table.dropColumn("featured");
      table.dropColumn("sort_order");
    })
  ]);
};
