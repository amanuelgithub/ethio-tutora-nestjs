import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  latitude: string;

  @IsOptional()
  @IsString()
  longitude: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  locality: string;

  @IsOptional()
  @IsString()
  region: string;
}
