import {ApplicationConfig, Project1Application} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new Project1Application(options);

  try {
    await app.boot();
    console.log('Application booted.');

    await app.migrateSchema();
    console.log('Database schema migrated.');

    await app.start();
    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/ping`);
  } catch (err) {
    console.error('Error starting the application:', err);
    process.exit(1);
  }

  return app;
}

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST || '127.0.0.1',
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };

  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
