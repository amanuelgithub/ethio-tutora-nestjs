import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admin/admin.module';
import { AuthModule } from 'src/auth/auth.module';
import { BookingsModule } from 'src/bookings/bookings.module';
import { CaslModule } from 'src/casl/casl.module';
import { ClientsModule } from 'src/clients/clients.module';
import { DB_CONFIG } from 'src/commons/constants';
import { appConfig } from 'src/config/app.config';
import { DatabaseConfig } from 'src/config/database.config';
import { validationSchema } from 'src/config/env.validation';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { TutorsModule } from 'src/tutors/tutors.module';
import { UsersModule } from 'src/users/users.module';
import { Seeder } from './seeder';
import { UsersSeederModule } from './users-seeder/users-seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/env/${process.env.NODE_ENV}.env`,
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

    UsersSeederModule,
  ],
  providers: [Logger, Seeder],
})
export class SeedersModule {}
