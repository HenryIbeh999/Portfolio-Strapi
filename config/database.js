// config/database.js
export default ({ env }) => {
  const isProduction = env('NODE_ENV') === 'production';

  // During build, avoid accessing DATABASE_CLIENT or DATABASE_URL
  if (isProduction) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: { rejectUnauthorized: false },
        },
      },
    };
  }

  // Otherwise, use SQLite safely
  return {
    connection: {
      client: 'sqlite',
      connection: { filename: env('DATABASE_FILENAME', '.tmp/data.db') },
      useNullAsDefault: true,
    },
  };
};