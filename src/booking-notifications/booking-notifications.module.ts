import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/casl/casl.module';
import { BookingNotificationsController } from './booking-notifications.controller';
import { BookingNotificationsService } from './booking-notifications.service';
import { BookingNotifications } from './entities/booking-notifications.entity';
import { BookingCreatedListener } from './listeners/booking-created.listener';

@Module({
  imports: [TypeOrmModule.forFeature([BookingNotifications]), CaslModule],
  controllers: [BookingNotificationsController],
  providers: [BookingNotificationsService, BookingCreatedListener],
})
export class BookingNotificationsModule {}
