import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookingStatus } from '../enum/booking-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

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
  @IsString()
  startingTime?: string;

  @ApiPropertyOptional()
  @IsString()
  endingTime?: string;

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
