const bcrypt = require('bcrypt');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes all existing entries
  await knex('users').del();

  // Insert new users
  const hashedPassword = await bcrypt.hash('password123', 10);
  return knex('users').insert([
    { username: 'testuser', password: hashedPassword },
    { username: 'anotheruser', password: hashedPassword },
  ]);
};