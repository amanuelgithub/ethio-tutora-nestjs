import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { TutorsModule } from 'src/tutors/tutors.module';
import { CaslModule } from 'src/casl/casl.module';
import { Schedule } from './entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Schedule]),
    TutorsModule,
    CaslModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
