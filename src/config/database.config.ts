import { registerAs } from '@nestjs/config';
import { Client } from '../clients/entities/client.entity';
import { Constants } from '../commons/constants';
import { Tutor } from '../tutors/entities/tutor.entity';
import { WeeklyAvailability } from '../tutors/entities/weekly-availbility.entity';
import { User } from '../users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
import { Subject } from '../subjects/entities/subject.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { Admin } from 'src/admin/entities/admin.entity';

const dataSourceOpitons: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.ET_TUTORA_DB_NAME || Constants.DATABASE_NAME,
  entities: [User, Tutor, Client, WeeklyAvailability, Subject, Booking, Admin],
  // replaced with `autoLoadEntities: true` to automatically import all the entities
  logging: true,
  migrationsRun: true,
  synchronize: true,
  // autoLoadEntities: true,
} as DataSourceOptions;

export const DatabaseConfig = registerAs<DataSourceOptions>(Constants.DB_CONFIG, () => {
  return dataSourceOpitons;
});
