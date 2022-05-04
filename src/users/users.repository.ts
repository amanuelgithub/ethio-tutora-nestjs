import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, age, email, username, password } =
      createUserDto;

    const user = this.create({
      firstName,
      lastName,
      age,
      email,
      username,
      password,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    try {
      const newUser = await this.save(user);
      if (!newUser) {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return user;
  }
}
