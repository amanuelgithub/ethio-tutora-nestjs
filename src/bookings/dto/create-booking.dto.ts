import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Tutor } from '../../tutors/entities/tutor.entity';
import { Client } from '../../clients/entities/client.entity';
import { BookingStatus } from '../enum/booking-status.enum';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  // @Type(() => Subject)
  // @ValidateNested({ each: true })
  // subjects?: Subject[];

  @ApiPropertyOptional()
  @IsNotEmpty()
  subjects: string[];

  @ApiPropertyOptional()
  @IsNotEmpty()
  @Type(() => Client)
  client: Client;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @Type(() => Tutor)
  tutor: Tutor;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  startingTime: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  endingTime: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEnum(BookingStatus)
  status: BookingStatus;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  rate: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  clientReview: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  clientRating: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tutorReview: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  tutorRating: number;
}
