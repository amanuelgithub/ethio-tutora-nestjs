import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Constants } from './commons/constants';
import { DatabaseConfig } from './config/database.config';
import { validationSchema } from './config/validation-schema';
import { AuthModule } from './auth/auth.module';
import { TutorsModule } from './tutors/tutors.module';

console.log(`${process.cwd()}/src/env/${process.env.NODE_ENV}.env`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/env/${process.env.NODE_ENV}.env`,
      load: Object.values([DatabaseConfig]),
      validationSchema,
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get(Constants.CONNETION_OPTION_NAME),
      }),
    }),

    UsersModule,

    AuthModule,

    TutorsModule,
  ],
})
export class AppModule {}
