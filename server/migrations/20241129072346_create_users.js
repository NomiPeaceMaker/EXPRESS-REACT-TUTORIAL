exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.string('username').notNullable().unique(); // Username
      table.string('password').notNullable(); // Hashed password
      table.timestamps(true, true); // Created_at and updated_at timestamps
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
  };