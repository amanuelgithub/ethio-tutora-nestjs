import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeeklyAvailability } from '../entities/weekly-availbility.entity';

@Injectable()
export class weeklyAvailabilityService {
  constructor(
    @InjectRepository(WeeklyAvailability)
    private availabilityRepository: Repository<WeeklyAvailability>,
  ) {}
}
