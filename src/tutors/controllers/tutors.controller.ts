import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UpdateTutorDetailDto } from '../dtos/update-tutor-detail.dto';
import { TutorsService } from '../services/tutors.service';

@Controller('tutors')
export class TutorsController {
  constructor(private tutorsService: TutorsService) {}

  @Get()
  async findAllTutors(): Promise<User[]> {
    return this.tutorsService.findTutors();
  }

  @Get(':id')
  async findOneTutor(@Param('id') id: string): Promise<User> {
    return this.tutorsService.findOneTutor(id);
  }

  @Patch(':id/update-details')
  async updateTutorDetail(
    @Param('id') id: string,
    @Body() updateTutorDetailDto: UpdateTutorDetailDto,
  ): Promise<User> {
    return this.tutorsService.updateTutorDetail(id, updateTutorDetailDto);
  }
}
