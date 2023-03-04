import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { User } from 'src/users/entities/user.entity';
import { UserType } from 'src/users/enums/user-type.enum';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UpdateTutorDetailDto } from '../dtos/update-tutor-detail.dto';

@Injectable()
export class TutorsService {
  constructor(private usersRepository: UsersRepository) {}

  async findOneTutor(id: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    const { password, isEmailConfirmed, userType, status, ...remaining } = user;

    return remaining as User;
  }

  // update profile
  async updateTutorDetail(
    id: string,
    updateTutorDetailDto: UpdateTutorDetailDto,
  ): Promise<User> {
    console.log('Update Tutor Detail', updateTutorDetailDto);

    const {
      age,
      bio,
      email,
      fatherName,
      firstName,
      gender,
      grandFatherName,
      phone,
      profileImage,
      ratePerHour,
    } = updateTutorDetailDto;

    const tutor = await this.findOneTutor(id);

    tutor.age = age;
    tutor.bio = bio;
    tutor.email = email;
    tutor.fatherName = fatherName;
    tutor.firstName = firstName;
    tutor.gender = gender;
    tutor.grandFatherName = grandFatherName;
    tutor.phone = phone;
    tutor.profileImage = profileImage;
    tutor.ratePerHour = ratePerHour;

    return this.usersRepository.save(tutor);
  }

  // used to show users on a list view
  async findTutorsPublicInfo(): Promise<User[]> {
    const userType = UserType.TUTOR;
    const tutors = await this.usersRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.fatherName',
        'user.grandFatherName',
        'user.age',
        'user.profileImage',
        'user.bio',
        'user.isBooked',
        'user.ratePerHour',
      ])
      .where('user.userType = :userType', { userType })
      .getMany();

    if (!tutors) {
      throw new NotFoundException('no tutors found');
    }

    return tutors;
  }

  async findTutorsPrivateInfo(): Promise<User[]> {
    const userType = UserType.TUTOR;
    const tutors = await this.usersRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.fatherName',
        'user.grandFatherName',
        'user.age',
        'user.gender',
        'user.phone',
        'user.email',
        'user.isEmailConfirmed',
        'user.profileImage',
        'user.status',
        'user.bio',
        'user.isBooked',
        'user.ratePerHour',
      ])
      .leftJoinAndSelect('user.location', 'location')
      .where('user.userType = :userType', { userType })
      .getMany();

    if (!tutors) {
      throw new NotFoundException('no tutors found');
    }

    return tutors;
  }
}
