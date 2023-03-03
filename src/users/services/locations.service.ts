import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { Location } from '../entities/locations.entity';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class LocationsService {
  private logger: Logger;

  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
    private readonly usersService: UsersService,
  ) {
    this.logger = new Logger();
  }

  async createLocation(
    requestingUser: any,
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    // const { userId, email, userType, profileImage } = requestingUser;
    const { userId } = requestingUser;

    const existingLocation = await this.locationsRepository.findOne({
      where: { userId },
    });

    if (existingLocation) {
      throw new ConflictException('Location already exists');
    }

    const user = await this.usersService.findUserById(userId);

    let location = this.locationsRepository.create(createLocationDto);
    location = await this.locationsRepository.save(location);

    user.location = location;
    this.usersService.update(user);

    this.logger.log('Location Created: ', location);

    return location;
  }

  async findLocationByUserId(
    requestingUser: any,
    userId: string,
  ): Promise<Location> {
    if (requestingUser.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to access this resource.',
      );
    }

    const location = await this.locationsRepository
      .createQueryBuilder('location')
      .where('location.userId = :userId', { userId })
      .getOne();

    this.logger.log('Location Found: ', location);
    return location;
  }

  // updating location
  async updateLocation(
    id: string,
    requestingUser: any,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const { userId } = requestingUser;
    const { latitude, longitude, city, locality, region } = updateLocationDto;

    const location = await this.findOneById(id);

    location.latitude = latitude;
    location.longitude = longitude;
    location.city = city;
    location.locality = locality;
    location.region = region;

    this.logger.log('Location Updated: ', location);
    return await this.locationsRepository.save(location);
  }

  // delete location
  async deleteLocation(requestingUser: any, id: string): Promise<void> {
    const { userId } = requestingUser;

    await this.usersService.deleteUserLocation(userId);

    const result = await this.locationsRepository
      .createQueryBuilder('location')
      .delete()
      .from(Location)
      .where('location.id = :id', { id })
      .execute();

    if (result.affected <= 0) {
      throw new NotFoundException('Location Not Found');
    }

    this.logger.log('Location Delete: ');
  }

  async findOneById(id: string): Promise<Location> {
    const location = await this.locationsRepository.findOne({ where: { id } });

    if (!location) {
      throw new NotFoundException('Such Location does not exist');
    }

    return location;
  }
}
