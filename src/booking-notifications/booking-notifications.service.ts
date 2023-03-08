import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingNotifications } from './entities/booking-notifications.entity';

@Injectable()
export class BookingNotificationsService {
  constructor(
    @InjectRepository(BookingNotifications)
    private bookingNotificationsRepository: Repository<BookingNotifications>,
  ) {}

  async findBookingNotificationsOfTutor(
    requestingUser: any,
    tutorId: string,
  ): Promise<BookingNotifications[]> {
    console.log('Requesting User Info: ', requestingUser);

    const notifications = await this.bookingNotificationsRepository.find({
      where: { tutorId },
    });

    return notifications;
  }
}
