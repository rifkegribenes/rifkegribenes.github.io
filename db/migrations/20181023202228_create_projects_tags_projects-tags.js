exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("tags", table => {
      table.increments("id").primary();
      table
        .string("tag")
        .notNullable()
        .unique();
      table.timestamps(false, true);
    }),

    knex.schema.createTable("projects", table => {
      table.increments("id").primary();
      table
        .string("title")
        .notNullable()
        .unique();
      table.text("body").notNullable();
      table.string("screenshot_url").notNullable();
      table.string("live_url").notNullable();
      table.string("github_url").notNullable();
      table.timestamps(false, true);
    }),

    // join table for many-to-many between projects and tags
    knex.schema.createTable("projects_tags", table => {
      table.increments("id").primary();
      table
        .integer("project_id")
        .references("id")
        .inTable("projects");
      table
        .integer("tag_id")
        .references("id")
        .inTable("tags");
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("projects_tags"),
    knex.schema.dropTable("projects"),
    knex.schema.dropTable("tags")
  ]);
};
