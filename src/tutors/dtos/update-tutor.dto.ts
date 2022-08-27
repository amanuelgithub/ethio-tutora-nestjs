import { IsNumber, IsString } from 'class-validator';

export class UpdateTutorDto {
  @IsString()
  title: string;

  @IsString()
  bio: string;

  @IsNumber()
  paymentRatePerHour: number;

  @IsString()
  higherEducationLevel: string;
}
