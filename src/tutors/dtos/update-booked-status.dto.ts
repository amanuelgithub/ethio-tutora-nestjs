import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TutorBookedStatus } from '../enum/tutor-booked-status.enum';

export class UpdateBookedStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TutorBookedStatus, {
    message: `isBooked must be either '${JSON.stringify(TutorBookedStatus)}'`,
  })
  isBooked: TutorBookedStatus;
}
