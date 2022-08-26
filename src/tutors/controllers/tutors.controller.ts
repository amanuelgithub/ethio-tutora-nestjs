import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { CheckPolicies } from 'src/casl/check-policy.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { UpdateBookedStatusDto } from '../dtos/update-booked-status.dto';
import { UpdateTutorDto } from '../dtos/update-tutor.dto';
import { Tutor } from '../entities/tutor.entity';
import { TutorsService } from '../services/tutors.service';

@Controller('tutors')
export class TutorsController {
  constructor(private tutorsService: TutorsService) {}

  @Get()
  findAll(): Promise<Tutor[]> {
    return this.tutorsService.findAll();
  }

  @Get('/tutor-id/:id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  findOne(@Param('id') id: string): Promise<Tutor> {
    return this.tutorsService.findOne(id);
  }

  @Patch('/tutor/:id')
  @UseGuards(JwtAuthGuard)
  updateOne(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto): Promise<Tutor> {
    return this.tutorsService.updateOne(id, updateTutorDto);
  }

  @Get('/user-id/:id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  findOneByUserId(@Param('id') id: string): Promise<Tutor> {
    return this.tutorsService.findOneByUserId(id);
  }

  @Patch('/:id/booked-status')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Tutor))
  updateBookedStatus(@Param('id') id: string, @Body() updateBookedStatusDto: UpdateBookedStatusDto): Promise<Tutor> {
    return this.tutorsService.updateBookedStatus(id, updateBookedStatusDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Tutor))
  remove(@Param('id') id: string): Promise<void> {
    return this.tutorsService.remove(id);
  }
}
