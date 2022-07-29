import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Seeder } from './database/seeders/seeder';
import { SeedersModule } from './database/seeders/seeders.module';

async function bootstrap() {
  NestFactory.createApplicationContext(SeedersModule)
    .then((appContext) => {
      const logger = appContext.get(Logger);
      const seeder = appContext.get(Seeder);

      seeder
        .seed()
        .then(() => {
          logger.debug('Seeding Completed!');
        })
        .catch((error) => {
          logger.error('Seeding Failed!');

          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}

bootstrap();
