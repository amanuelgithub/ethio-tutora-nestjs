import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingCreatedEvent } from 'src/bookings/events/booking-created.event';
import { Repository } from 'typeorm';
import { BookingNotifications } from '../entities/booking-notifications.entity';

@Injectable()
export class BookingCreatedListener {
  constructor(
    @InjectRepository(BookingNotifications)
    private bookingNotificationsRepository: Repository<BookingNotifications>,
  ) {}

  @OnEvent('booking.created')
  async handleBookingCreatedEvent(payload: BookingCreatedEvent) {
    const notification = this.bookingNotificationsRepository.create({
      bookingId: payload.bookingId,
      tutorId: payload.tutorId,
      message: payload.message,
    });

    await this.bookingNotificationsRepository.save(notification);
  }
}
