import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookingStatus } from '../enum/booking-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Schedule } from '../entities/schedule.entity';

export class CreateBookingDto {
  @IsString()
  clientId?: string;

  @IsString()
  tutorId?: string;

  @ApiPropertyOptional()
  @IsString()
  topic?: string;

  @ApiPropertyOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsArray()
  subjects?: string[];

  @ApiPropertyOptional()
  @IsNotEmpty()
  schedules?: any[];

  @ApiPropertyOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiPropertyOptional()
  @IsNumber()
  rate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  clientReview?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  clientRating?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tutorReview?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  tutorRating?: number;
}
