exports.up = function (knex) {
    return knex.schema.createTable('tasks', (table) => {
      table.increments('id').primary(); // Auto-incrementing ID
      table.string('title').notNullable(); // Task title
      table.text('description'); // Task description
      table.integer('user_id').unsigned().notNullable(); // User ID
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE'); // Foreign key to users table
      table.timestamps(true, true); // Created_at and updated_at timestamps
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tasks');
  };