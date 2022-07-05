import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(3)
  // firstName: string;
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(3)
  // lastName: string;
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(3)
  // age: number;
  // @IsNotEmpty()
  // @IsString()
  // email: string;
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(4)
  // username: string;
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(6)
  // password: string;
}
