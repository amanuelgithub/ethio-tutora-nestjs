import { Controller } from '@nestjs/common';
import { TutorsService } from '../services/tutors.service';

@Controller('tutors')
export class TutorsController {
  constructor(private tutorsService: TutorsService) {}
}
