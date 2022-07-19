import { ApiPropertyOptional } from '@nestjs/swagger';
import { Equals, IsEnum, IsNotEmpty } from 'class-validator';
import { BookingStatus } from '../enum/booking-status.enum';

export class CancelBookingDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEnum(BookingStatus)
  @Equals(BookingStatus.CANCELED)
  status: BookingStatus;
}
