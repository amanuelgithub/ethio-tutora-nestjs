import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Tutor } from '../entities/tutor.entity';

export class createAvailabilityDto {
  @IsNotEmpty()
  day: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  // @IsNumber()
  // @IsNotEmpty()
  // tutorID: number;
}
