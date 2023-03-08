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
import { SubjectsModule } from './subjects/subjects.module';
import { BookingsModule } from './bookings/bookings.module';
import { CaslModule } from './casl/casl.module';
import { BookingNotificationsModule } from './booking-notifications/booking-notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

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

    EventEmitterModule.forRoot(),

    UsersModule,

    AuthModule,

    TutorsModule,

    SubjectsModule,

    BookingsModule,

    CaslModule,

    BookingNotificationsModule,
  ],
})
export class AppModule {}
