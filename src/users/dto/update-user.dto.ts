import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {
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
