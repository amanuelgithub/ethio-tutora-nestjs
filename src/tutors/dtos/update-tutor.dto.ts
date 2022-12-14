import { IsNumber, IsString } from 'class-validator';

export class UpdateTutorDto {
  @IsString()
  bio: string;

  @IsNumber()
  ratePerHour: number;
}
