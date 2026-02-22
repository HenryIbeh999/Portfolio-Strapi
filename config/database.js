// config/database.js
export default ({ env }) => {
  // Determine runtime environment
  const isProduction = env('NODE_ENV') === 'production';

  // SQLite fallback for build-time & dev
  const defaultDb = {
    connection: {
      client: 'sqlite',
      connection: { filename: env('DATABASE_FILENAME', '.tmp/data.db') },
      useNullAsDefault: true,
    },
  };

  // Only try Postgres if NODE_ENV=production **and at runtime**
  if (isProduction && typeof process.env.DATABASE_URL !== 'undefined') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
        },
      },
    };
  }

  return defaultDb;
};
