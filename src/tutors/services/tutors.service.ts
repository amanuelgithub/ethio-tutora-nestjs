import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookedStatusDto } from '../dtos/update-booked-status.dto';
import { Tutor } from '../entities/tutor.entity';
import { WeeklyAvailability } from '../entities/weekly-availbility.entity';
import { BookedStatus } from '../enum/booked-status.enum';

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(Tutor)
    private tutorsRepository: Repository<Tutor>,
  ) {}

  async findAllTutors(): Promise<Tutor[]> {
    try {
      const tutors = await this.tutorsRepository.find();
      if (!tutors) {
        throw new NotFoundException('Not a Single Tutor is Found!');
      }
      return tutors;
    } catch (error) {
      console.log('Error:=> ', error);
      throw new InternalServerErrorException();
    }
  }

  async signUpTutor(tutor: Tutor): Promise<void> {
    console.log(tutor);
    await this.tutorsRepository.save(tutor);
  }

  async findTutor(id: string): Promise<Tutor> {
    const tutor = await this.tutorsRepository.findOne(id);
    if (!tutor) {
      throw new NotFoundException(`Cannot find tutor with ID: ${id}`);
    }
    return tutor;
  }

  async createWeeklyAvailabilities(
    id: string,
    weeklyAvailabilities: WeeklyAvailability[],
  ): Promise<Tutor> {
    const tutor = await this.findTutor(id);

    tutor.weeklyAvailabilities = weeklyAvailabilities;

    return await this.tutorsRepository.save(tutor);
  }

  async updateBookedStatus(
    id: string,
    updateBookedStatusDto: UpdateBookedStatusDto,
  ): Promise<Tutor> {
    const tutor = await this.findTutor(id);

    const { isBooked } = updateBookedStatusDto;
    tutor.isBooked = isBooked;
    await this.tutorsRepository.save(tutor);

    if (!tutor) {
      throw new NotFoundException();
    }

    return tutor;
  }
}
