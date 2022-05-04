import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();

    if (!users) throw new NotFoundException('Not a single user is found.');

    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} is not found.`);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    console.log('User Before: ', user);

    const { firstName, lastName, age, email, username, password } =
      updateUserDto;

    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    user.email = email;
    user.username = username;
    user.password = password;

    console.log('User After: ', user);

    return await this.usersRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
  }

  getUserRepository() {
    return this.usersRepository;
  }
}
