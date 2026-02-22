export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (client === 'postgres') {
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