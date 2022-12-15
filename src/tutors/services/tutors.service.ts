import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { User } from 'src/users/entities/user.entity';
import { UserType } from 'src/users/user-type.enum';
import { UsersRepository } from 'src/users/users.repository';
import { UpdateTutorDetailDto } from '../dtos/update-tutor-detail.dto';

@Injectable()
export class TutorsService {
  constructor(private usersRepository: UsersRepository) {}

  async findOneTutor(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    const { password, isEmailConfirmed, userType, status, ...remaining } = user;

    return remaining as User;
  }

  // update profile
  async updateTutorDetail(
    id: string,
    updateTutorDetailDto: UpdateTutorDetailDto,
  ): Promise<User> {
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
  async findTutors(): Promise<User[]> {
    const userType = UserType.TUTOR;
    const tutors = await this.usersRepository
      .createQueryBuilder('user')
      .select([
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
}
