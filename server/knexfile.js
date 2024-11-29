module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'task_manager_db',
      },
      pool: {
        min: 0, // Minimum number of connections
        max: 10, // Maximum number of connections
      },
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './seeds',
      },
    },
  };