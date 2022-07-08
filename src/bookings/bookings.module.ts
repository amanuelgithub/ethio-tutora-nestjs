import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { TutorsModule } from 'src/tutors/tutors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), ClientsModule, TutorsModule],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
