import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { UserType } from 'src/users/user-type.enum';

export class SignUpDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  @MinLength(10)
  @MaxLength(20)
  phone: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak!',
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;
}
