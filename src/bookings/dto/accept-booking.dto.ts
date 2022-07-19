import { ApiPropertyOptional } from '@nestjs/swagger';
import { Equals, IsEnum, IsNotEmpty } from 'class-validator';
import { BookingStatus } from '../enum/booking-status.enum';

export class AcceptBookingDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEnum(BookingStatus)
  @Equals(BookingStatus.ACCEPTED)
  status: BookingStatus;
}
