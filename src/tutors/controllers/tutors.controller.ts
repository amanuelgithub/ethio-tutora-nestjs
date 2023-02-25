import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CheckPolicies } from 'src/casl/check-policy.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { User } from 'src/users/entities/user.entity';
import { UpdateTutorDetailDto } from '../dtos/update-tutor-detail.dto';
import { TutorsService } from '../services/tutors.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tutors')
export class TutorsController {
  constructor(private tutorsService: TutorsService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  async findAllTutors(): Promise<User[]> {
    return this.tutorsService.findTutors();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  async findOneTutor(@Req() req, @Param('id') id: string): Promise<User> {
    return this.tutorsService.findOneTutor(id);
  }

  @Patch(':id/update-details')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  async updateTutorDetail(
    @Param('id') id: string,
    @Body() updateTutorDetailDto: UpdateTutorDetailDto,
  ): Promise<User> {
    console.log('udpdate tutor: ', updateTutorDetailDto);
    return this.tutorsService.updateTutorDetail(id, updateTutorDetailDto);
  }
}
