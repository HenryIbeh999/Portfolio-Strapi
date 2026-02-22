// config/database.js
export default ({ env }) => {
  // Determine if runtime environment is production
  const isProduction = env('NODE_ENV') === 'production';

  // -----------------------------
  // Production: PostgreSQL
  // -----------------------------
  if (isProduction) {
    return {
      connection: {
        client: 'postgres',
        connection: () => {
          // Access DATABASE_URL only at runtime
          const connectionString = env('DATABASE_URL');
          if (!connectionString) {
            throw new Error(
              'DATABASE_URL is missing! Make sure it is set in Railway variables.'
            );
          }
          return {
            connectionString,
            ssl: { rejectUnauthorized: false },
          };
        },
      },
    };
  }

  // -----------------------------
  // Development / Build: SQLite
  // -----------------------------
  return {
    connection: {
      client: 'sqlite',
      connection: { filename: env('DATABASE_FILENAME', '.tmp/data.db') },
      useNullAsDefault: true,
    },
  };
};
