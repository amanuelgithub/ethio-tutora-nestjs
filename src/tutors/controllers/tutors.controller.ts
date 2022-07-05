import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateBookedStatusDto } from '../dtos/update-booked-status.dto';
import { Tutor } from '../entities/tutor.entity';
import { TutorsService } from '../services/tutors.service';

@Controller('tutors')
export class TutorsController {
  constructor(private tutorsService: TutorsService) {}

  @Get()
  findAll(): Promise<Tutor[]> {
    return this.tutorsService.findAllTutors();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Tutor> {
    return this.tutorsService.findSingleTutor(id);
  }

  @Patch('/:id/booked-status')
  updateBookedStatus(
    @Param('id') id: string,
    @Body() updateBookedStatusDto: UpdateBookedStatusDto,
  ): Promise<Tutor> {
    return this.tutorsService.updateBookedStatus(id, updateBookedStatusDto);
  }
}
