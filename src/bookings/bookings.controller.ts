import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AcceptBookingDto } from './dto/accept-booking.dto';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Booking> {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto): Promise<Booking> {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bookingsService.remove(id);
  }

  @Patch('/:id/accept')
  acceptBooking(@Param('id') id: string, @Body() acceptBookingDto: AcceptBookingDto): Promise<Booking> {
    return this.bookingsService.acceptBooking(id, acceptBookingDto);
  }

  @Patch('/:id/cancel')
  cancelBooking(@Param('id') id: string, @Body() cancelBookingDto: CancelBookingDto): Promise<Booking> {
    return this.bookingsService.cancelBooking(id, cancelBookingDto);
  }
}
