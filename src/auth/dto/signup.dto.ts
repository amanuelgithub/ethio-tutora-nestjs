import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak!',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;
}
