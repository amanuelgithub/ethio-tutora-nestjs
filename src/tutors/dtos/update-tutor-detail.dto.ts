import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { GenderEnum } from 'src/users/gender.enum';

export class UpdateTutorDetailDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  fatherName?: string;

  @IsOptional()
  @IsString()
  grandFatherName?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsEnum({ enum: GenderEnum })
  gender?: GenderEnum;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  ratePerHour?: number;
}
