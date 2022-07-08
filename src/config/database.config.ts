import { registerAs } from '@nestjs/config';
import { Client } from '../clients/entities/client.entity';
import { Constants } from '../commons/constants';
import { Tutor } from '../tutors/entities/tutor.entity';
import { WeeklyAvailability } from '../tutors/entities/weekly-availbility.entity';
import { User } from '../users/entities/user.entity';
import { ConnectionOptions } from 'typeorm';
import { Subject } from '../subjects/entities/subject.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { Admin } from 'src/admin/entities/admin.entity';

export const DatabaseConfig = registerAs<ConnectionOptions>(
  Constants.CONNETION_OPTION_NAME,
  () => {
    const baseConfig: ConnectionOptions = {
      type: 'sqlite',
      database: process.env.ET_TUTORA_DB_NAME || Constants.DATABASE_NAME,
      entities: [
        User,
        Tutor,
        Client,
        WeeklyAvailability,
        Subject,
        Booking,
        Admin,
      ],
    };
    return {
      ...baseConfig,
      logging: true,
      migrationsRun: true,
      synchronize: true,
    } as ConnectionOptions;
  },
);
