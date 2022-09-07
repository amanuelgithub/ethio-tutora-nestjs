import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsService } from '../clients/clients.service';
import { TutorsService } from '../tutors/services/tutors.service';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AcceptBookingDto } from './dto/accept-booking.dto';
import { Booking } from './entities/booking.entity';
import { CancelBookingDto } from './dto/cancel-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingsRepository: Repository<Booking>,

    private tutorsService: TutorsService,

    private clientsService: ClientsService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingsRepository.create(createBookingDto as Booking);

    const savedBooking = await this.bookingsRepository.save(booking);

    return savedBooking;
  }

  async findAll(): Promise<Booking[]> {
    const bookings = await this.bookingsRepository.find();

    if (!bookings) {
      throw new NotFoundException('Not a single Booking is found!');
    }

    return bookings;
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({ where: { id } });

    if (!booking) {
      throw new NotFoundException(`Booking with ID: ${id} is not found!`);
    }

    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);

    Object.assign(booking, updateBookingDto);

    return await this.bookingsRepository.save(booking);
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookingsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Booking with ID: ${id} is not found!`);
    }
  }

  // below are specific methods tobe called by client or tutor

  // BookingStatus enums
  // 1. REQUESTED = 'Requested' ===> default(initial status when booking is created)
  // 2. ACCEPTED = 'Accepted' => handled by tutor
  // 3. CANCELED = 'Canceled' => handled by client
  // 4. ENDED = 'Ended' => handled by the system

  async acceptBooking(id: string, acceptBookingDto: AcceptBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);

    const { status } = acceptBookingDto;

    booking.status = status;

    return await this.bookingsRepository.save(booking);
  }

  async cancelBooking(id: string, cancelBookingDto: CancelBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);

    const { status } = cancelBookingDto;

    booking.status = status;

    return await this.bookingsRepository.save(booking);
  }
}
