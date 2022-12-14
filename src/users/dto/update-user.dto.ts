import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsNumber()
  phone: number;

  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
