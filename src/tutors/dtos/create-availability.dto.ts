import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Tutor } from '../entities/tutor.entity';

export class createAvailabilityDto {
  @ApiProperty()
  @IsNotEmpty()
  day: string;

  @ApiProperty()
  @IsNotEmpty()
  from: string;

  @ApiProperty()
  @IsNotEmpty()
  to: string;

  // @IsNumber()
  // @IsNotEmpty()
  // tutorID: number;
}
