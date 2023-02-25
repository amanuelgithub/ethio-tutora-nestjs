import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { UserType } from 'src/users/enums/user-type.enum';

export class PhoneSignUpDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  fatherName: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  phone: string;

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
  @Matches(UserType.CLIENT)
  userType: UserType;
}
