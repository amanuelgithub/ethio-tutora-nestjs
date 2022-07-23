import { registerAs } from '@nestjs/config';
import { Client } from '../clients/entities/client.entity';
import { DATABASE_NAME, DB_CONFIG } from '../commons/constants';
import { Tutor } from '../tutors/entities/tutor.entity';
import { WeeklyAvailability } from '../tutors/entities/weekly-availbility.entity';
import { User } from '../users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
import { Subject } from '../subjects/entities/subject.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { Admin } from 'src/admin/entities/admin.entity';

import * as dotenv from 'dotenv';

dotenv.config({ path: `${process.cwd()}/src/env/${process.env.NODE_ENV}.env` });

const postgresqlDataSourceOption: DataSourceOptions = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  // host: process.env.DATABASE_HOST || 'localhost',
  // port: process.env.DATABASE_PORT || 5432,
  // database: process.env.DATABASE_NAME || 'ethio_tutora',
  // username: process.env.DATABASE_USER || 'postgres',
  // password: process.env.DATABASE_PASSWORD || 'password',
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [User, Tutor, Client, WeeklyAvailability, Subject, Booking, Admin],
  synchronize: false,
} as DataSourceOptions;

// previously used sqlite database configuration
const sqliteDataSourceOption: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.ET_TUTORA_DB_NAME || DATABASE_NAME,
  entities: [User, Tutor, Client, WeeklyAvailability, Subject, Booking, Admin],
  // replaced with `autoLoadEntities: true` to automatically import all the entities
  logging: true,
  migrationsRun: true,
  synchronize: true,
  // autoLoadEntities: true,
} as DataSourceOptions;

export const DatabaseConfig = registerAs<DataSourceOptions>(DB_CONFIG, () => {
  return postgresqlDataSourceOption;
});
