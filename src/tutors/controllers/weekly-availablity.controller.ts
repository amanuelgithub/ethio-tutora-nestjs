import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { CheckPolicies } from 'src/casl/check-policy.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { createAvailabilityDto } from '../dtos/create-availability.dto';
import { WeeklyAvailability } from '../entities/weekly-availbility.entity';
import { weeklyAvailabilityService } from '../services/weekly-availability.service';

@UseGuards(JwtAuthGuard)
@Controller('availability')
export class weeklyAvailabilityController {
  constructor(private availabilityService: weeklyAvailabilityService) {}

  @Get('/')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, WeeklyAvailability))
  findAllWeeklyAvailability(): Promise<WeeklyAvailability[]> {
    return this.availabilityService.findAllWeeklyAvailability();
  }

  @Get('/tutor/:id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, WeeklyAvailability))
  findAllWeeklyAvailabilityByTutorID(@Param('id') id: string): Promise<WeeklyAvailability[]> {
    return this.availabilityService.findAllWeeklyAvailabilityByTutorID(id);
  }

  @Post('/tutor/:id/')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, WeeklyAvailability))
  createWeeklyAvailability(
    @Param() id: string,
    @Body() createAvailabilityDtos: createAvailabilityDto[],
  ): Promise<void> {
    return this.availabilityService.createWeeklyAvailabilities(id, createAvailabilityDtos);
  }
}
