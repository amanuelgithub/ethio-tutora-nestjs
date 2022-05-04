import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createAvailabilityDto } from '../dtos/create-availability.dto';
import { WeeklyAvailability } from '../entities/weekly-availbility.entity';
import { weeklyAvailabilityService } from '../services/weekly-availability.service';

@Controller('availability')
export class weeklyAvailabilityController {
  constructor(private availabilityService: weeklyAvailabilityService) {}

  @Get()
  findAllWeeklyAvailability(): Promise<WeeklyAvailability[]> {
    return this.availabilityService.findAllWeeklyAvailability();
  }

  @Get('/tutor/:id')
  findAllWeeklyAvailabilityByTutorID(
    @Param('id') id: string,
  ): Promise<WeeklyAvailability[]> {
    return this.availabilityService.findAllWeeklyAvailabilityByTutorID(id);
  }

  @Post('/tutor/:id')
  createWeeklyAvailability(
    @Param() id: string,
    @Body() createAvailabilityDtos: createAvailabilityDto[],
  ): Promise<void> {
    return this.availabilityService.createWeeklyAvailabilities(
      id,
      createAvailabilityDtos,
    );
  }
}
