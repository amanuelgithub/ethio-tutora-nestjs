import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { BookedStatus } from '../enum/booked-status.enum';

export class UpdateBookedStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(BookedStatus, {
    message: `isBooked must be either '${JSON.stringify(BookedStatus)}'`,
  })
  isBooked: BookedStatus;
}
