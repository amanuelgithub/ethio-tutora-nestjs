import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AcceptBookingDto } from './dto/accept-booking.dto';
import { Booking } from './entities/booking.entity';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { Schedule } from './entities/schedule.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BookingCreatedEvent } from './events/booking-created.event';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const {
      clientId,
      tutorId,
      topic,
      description,
      subjects,
      schedules,
      status,
      rate,
    } = createBookingDto;

    // saved schedule instances
    const scheduleInstance = [];
    for (const schedule of schedules) {
      const sche = this.schedulesRepository.create(schedule);
      try {
        await this.schedulesRepository.save(sche);
      } catch (err: any) {
        console.log('Error: ', err);
      } finally {
        scheduleInstance.push(sche);
      }
    }

    const booking = this.bookingsRepository.create({
      clientId,
      tutorId,
      topic,
      description,
      subjects,
      schedules: scheduleInstance as Schedule[],
      status,
      rate,
    });

    const savedBooking = await this.bookingsRepository.save(booking);

    // create booking events
    const bookingCreatedEvent = new BookingCreatedEvent();
    bookingCreatedEvent.bookingId = savedBooking.id;
    bookingCreatedEvent.tutorId = savedBooking.tutorId;
    bookingCreatedEvent.message = `A client with following ID: ${clientId} has made a booking for you.`;
    this.eventEmitter.emit('booking.created', bookingCreatedEvent);

    return savedBooking;
  }

  async findAll(): Promise<Booking[]> {
    const bookings = await this.bookingsRepository.find();

    if (!bookings) {
      throw new NotFoundException('Not a single Booking is found!');
    }

    return bookings;
  }

  // return all list of booking for a specific tutor
  async findBookingsByTutorId(tutorId: string): Promise<Booking[]> {
    // const bookings = await this.bookingsRepository.find({ where: { tutorId: tutorId } });
    const bookings = await this.bookingsRepository
      .createQueryBuilder('bookings')
      .where('bookings.tutorId = :tutorId', { tutorId })
      .getMany();

    if (!bookings) {
      throw new NotFoundException(
        `Cannot find booking for tutor with id: ${tutorId}`,
      );
    }
    return bookings;
  }

  // return all list of booking for a specific tutor
  async findBookingsByClientId(clientId: string): Promise<Booking[]> {
    // const bookings = await this.bookingsRepository.find({ where: { tutorId: tutorId } });
    const bookings = await this.bookingsRepository
      .createQueryBuilder('bookings')
      .where('bookings.clientId = :clientId', { clientId })
      .getMany();

    if (!bookings) {
      throw new NotFoundException(
        `Cannot find booking for Client with id: ${clientId}`,
      );
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

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
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

  async acceptBooking(
    id: string,
    acceptBookingDto: AcceptBookingDto,
  ): Promise<Booking> {
    const booking = await this.findOne(id);

    const { status } = acceptBookingDto;

    booking.status = status;

    return await this.bookingsRepository.save(booking);
  }

  async cancelBooking(
    id: string,
    cancelBookingDto: CancelBookingDto,
  ): Promise<Booking> {
    const booking = await this.findOne(id);

    const { status } = cancelBookingDto;

    booking.status = status;

    return await this.bookingsRepository.save(booking);
  }
}
