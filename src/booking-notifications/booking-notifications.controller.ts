import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { CheckPolicies } from 'src/casl/check-policy.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { BookingNotificationsService } from './booking-notifications.service';
import { BookingNotifications } from './entities/booking-notifications.entity';

@Controller('booking-notifications')
export class BookingNotificationsController {
  constructor(
    private readonly bookingNotificationsService: BookingNotificationsService,
  ) {}

  @Get(':tutorId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Read, BookingNotifications),
  )
  findBookingNotificationsOfTutor(
    @Req() req,
    @Param('tutorId') tutorId: string,
  ): Promise<BookingNotifications[]> {
    return this.bookingNotificationsService.findBookingNotificationsOfTutor(
      req.user,
      tutorId,
    );
  }
}
