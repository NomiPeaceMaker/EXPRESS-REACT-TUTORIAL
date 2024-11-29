const { Model } = require('objection');

class User extends Model {
    // Specify the database table name for this model
    static get tableName() {
      return 'users'; // Ensure this matches your database table name
    }
  }
module.exports = User;