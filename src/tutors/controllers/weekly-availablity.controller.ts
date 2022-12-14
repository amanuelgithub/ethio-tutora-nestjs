import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { weeklyAvailabilityService } from '../services/weekly-availability.service';

@UseGuards(JwtAuthGuard)
@Controller('availability')
export class weeklyAvailabilityController {
  constructor(private availabilityService: weeklyAvailabilityService) {}
}
