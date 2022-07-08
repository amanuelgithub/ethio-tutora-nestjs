import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createAvailabilityDto } from '../dtos/create-availability.dto';
import { WeeklyAvailability } from '../entities/weekly-availbility.entity';
import { TutorsService } from './tutors.service';

@Injectable()
export class weeklyAvailabilityService {
  constructor(
    @InjectRepository(WeeklyAvailability)
    private availabilityRepository: Repository<WeeklyAvailability>,
    private tutorsService: TutorsService,
  ) {}

  async createWeeklyAvailabilities(
    id: string,
    createAvailabilityDtos: createAvailabilityDto[] = [],
  ): Promise<void> {
    let availabilities: WeeklyAvailability[] = [];

    /**
     *
     * createAvailabilityDtos -> passed from request body must be wraped within an array.
     *    -> The following is an example.
     *
     * [
     *   {
     *     "day": "Monday",
     *     "from": "10:00 pm",
     *     "to": "1:00 am"
     *   }
     * ]
     */
    createAvailabilityDtos.forEach((createAvailabilityDto) => {
      let { day, from, to } = createAvailabilityDto;

      let weeklyAvailability = new WeeklyAvailability();
      weeklyAvailability.day = day;
      weeklyAvailability.from = from;
      weeklyAvailability.to = to;

      this.availabilityRepository.create(weeklyAvailability);

      availabilities.push(weeklyAvailability);
    });

    // store arrays of availabilities into the tutors.weeklyAvailabilities attribute
    const tutor = await this.tutorsService.createWeeklyAvailabilities(
      id,
      availabilities,
    );

    availabilities.forEach((availability) => {
      availability.tutor = tutor;
      this.availabilityRepository.save(availability);
    });
  }

  /** List of all weekly availability of all Tutors */
  async findAllWeeklyAvailability(): Promise<WeeklyAvailability[]> {
    return this.availabilityRepository.find();
  }

  /** weekly availability of a single Tutor */
  async findAllWeeklyAvailabilityByTutorID(
    id: string,
  ): Promise<WeeklyAvailability[]> {
    // check if tutor with the provided id exist
    await this.tutorsService.findOne(id);

    const result = await this.availabilityRepository
      .createQueryBuilder('weekly_availability')
      .where('weekly_availability.tutorId = :id', { id })
      .getMany();

    return result;
  }
}
