export default ({ env }) => {
  const isProduction = env('NODE_ENV') === 'production';
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (isProduction && client === 'postgres') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: {
            rejectUnauthorized: false,
          },
        },
      },
    };
  }

  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      useNullAsDefault: true,
    },
  };
};