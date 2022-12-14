import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { DaysEnum } from '../enum/days.enum';

export class createAvailabilityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum({ enum: DaysEnum })
  day: DaysEnum;

  @ApiProperty()
  @IsNotEmpty()
  times: string;
}
