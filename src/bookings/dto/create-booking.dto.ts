import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Tutor } from '../../tutors/entities/tutor.entity';
import { Client } from '../../clients/entities/client.entity';
import { BookingStatus } from '../enum/booking-status.enum';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  // @Type(() => Subject)
  // @ValidateNested({ each: true })
  // subjects?: Subject[];

  @IsNotEmpty()
  subjects: string[];

  @IsNotEmpty()
  @Type(() => Client)
  client: Client;

  @IsNotEmpty()
  @Type(() => Tutor)
  tutor: Tutor;

  @IsNotEmpty()
  @IsString()
  startingTime: string;

  @IsNotEmpty()
  @IsString()
  endingTime: string;

  @IsNotEmpty()
  @IsEnum(BookingStatus)
  status: BookingStatus;

  @IsNotEmpty()
  @IsNumber()
  rate: number;

  @IsNotEmpty()
  @IsString()
  clientReview: string;

  @IsNotEmpty()
  @IsNumber()
  clientRating: number;

  @IsNotEmpty()
  @IsString()
  tutorReview: string;

  @IsNotEmpty()
  @IsNumber()
  tutorRating: number;
}
