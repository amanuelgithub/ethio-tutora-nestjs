import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UpdateBookedStatusDto } from '../dtos/update-booked-status.dto';
import { Tutor } from '../entities/tutor.entity';
import { WeeklyAvailability } from '../entities/weekly-availbility.entity';

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(Tutor)
    private tutorsRepository: Repository<Tutor>,
    private usersService: UsersService,
  ) {}

  async signup(tutor: Tutor): Promise<void> {
    await this.tutorsRepository.save(tutor);
  }

  async findAll(): Promise<Tutor[]> {
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

  async findOne(id: string): Promise<Tutor> {
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
    const tutor = await this.findOne(id);

    tutor.weeklyAvailabilities = weeklyAvailabilities;

    return await this.tutorsRepository.save(tutor);
  }

  async updateBookedStatus(
    id: string,
    updateBookedStatusDto: UpdateBookedStatusDto,
  ): Promise<Tutor> {
    const tutor = await this.findOne(id);

    const { isBooked } = updateBookedStatusDto;
    tutor.isBooked = isBooked;
    await this.tutorsRepository.save(tutor);

    return tutor;
  }

  // async update(id: string, updateTutorDto: UpdateTutorDto): Promise<Tutor> {
  //   const tutor = await this.findSingleTutor(id);
  //   Object.assign(tutor, updateTutorDto);
  //   return await this.tutorsRepository.save(tutor);
  // }

  async remove(id: string): Promise<void> {
    // remove both data found in tutors and users table
    const tutor = await this.findOne(id);

    await this.usersService.deleteUser(tutor.user.id);
  }

  // update's booking list
  async updateBookingList(id: string, booking: Booking) {
    const tutor = await this.findOne(id);

    let bookings = [];
    for (let booking in tutor.bookings) {
      bookings.push(tutor.bookings[booking]);
    }
    // finally add booking sent through the parameter
    bookings.push(booking);

    tutor.bookings = bookings;

    this.tutorsRepository.save(tutor);
  }
}
