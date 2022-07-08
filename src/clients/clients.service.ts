import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    private usersService: UsersService,
  ) {}

  async signUpClient(client: Client): Promise<void> {
    await this.clientsRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find();
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientsRepository.findOne({ id });
    if (!client) {
      throw new NotFoundException(`Client with id: ${id} is not found.`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    Object.assign(client, updateClientDto);
    return await this.clientsRepository.save(client);
  }

  async remove(id: string): Promise<void> {
    // remves both data found in clients and users table
    const client = await this.findOne(id);

    await this.usersService.deleteUser(client.user.id);
  }

  async updateBookingList(id: string, booking: Booking) {
    const client = await this.findOne(id);

    let bookings = [];
    for (let booking in client.bookings) {
      bookings.push(client.bookings[booking]);
    }
    // finally add the booking sent through the parameter
    bookings.push(booking);

    client.bookings = [booking];

    this.clientsRepository.save(client);
  }
}
