import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DB_CONFIG } from './commons/constants';
import { DatabaseConfig } from './config/database.config';
import { appConfig } from './config/app.config';
import { validationSchema } from './config/env.validation';
import { AuthModule } from './auth/auth.module';
import { TutorsModule } from './tutors/tutors.module';
import { ClientsModule } from './clients/clients.module';
import { SubjectsModule } from './subjects/subjects.module';
import { BookingsModule } from './bookings/bookings.module';
import { AdminModule } from './admin/admin.module';
import { CaslModule } from './casl/casl.module';
import { SeedersModule } from './database/seeders/seeders.module';

console.log(`${process.cwd()}/src/env/${process.env.NODE_ENV}.env`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: Object.values([DatabaseConfig, appConfig]),
      validationSchema: validationSchema,
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get(DB_CONFIG),
      }),
    }),

    UsersModule,

    AuthModule,

    TutorsModule,

    ClientsModule,

    SubjectsModule,

    BookingsModule,

    AdminModule,

    CaslModule,

    SeedersModule,
  ],
})
export class AppModule {}
