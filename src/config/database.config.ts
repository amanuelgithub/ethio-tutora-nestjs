import { registerAs } from '@nestjs/config';
import { Constants } from 'src/commons/constants';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { WeeklyAvailability } from 'src/tutors/entities/weekly-availbility.entity';
import { User } from 'src/users/entities/user.entity';
import { ConnectionOptions } from 'typeorm';

export const DatabaseConfig = registerAs<ConnectionOptions>(
  Constants.CONNETION_OPTION_NAME,
  () => {
    const baseConfig: ConnectionOptions = {
      type: 'sqlite',
      database: process.env.ET_TUTORA_DB_NAME || Constants.DATABASE_NAME,
      entities: [User, Tutor, WeeklyAvailability],
    };
    return {
      ...baseConfig,
      logging: true,
      // migrationsRun: true,
      synchronize: true,
    } as ConnectionOptions;
  },
);
