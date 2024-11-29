const { Model } = require('objection');

class Task extends Model {
  static get tableName() {
    return 'tasks'; // Ensure this matches the name of your database table
  }
}

module.exports = Task;