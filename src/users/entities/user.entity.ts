import { WeeklyAvailability } from 'src/tutors/entities/weekly-availbility.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GenderEnum } from '../gender.enum';
import { UserStatusEnum } from '../user-status.enum';
import { UserType } from '../user-type.enum';
import { Location } from './locations.entity';

export interface IUser {
  id: string;
  firstName?: string;
  fatherName?: string;
  grandFatherName?: string;
  age?: number;
  gender?: GenderEnum;
  phone?: string;
  email?: string;
  isEmailConfirmed?: boolean;
  password: string;
  userType: UserType;

  profileImage?: string;
  status?: UserStatusEnum;
  bio?: string;
  isBooked?: boolean;
  ratePerHour?: number;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName?: string;

  @Column()
  fatherName?: string;

  @Column()
  grandFatherName?: string;

  @Column()
  age?: number;

  @Column({ type: 'enum', enum: GenderEnum })
  gender?: GenderEnum;

  @Column({ unique: true })
  phone?: string;

  @Column({ unique: true })
  email?: string;

  @Column({ type: 'boolean', default: false })
  isEmailConfirmed?: boolean;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.TUTOR })
  userType: UserType;

  @Column({ nullable: true })
  profileImage?: string;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.INACTIVE,
  })
  status?: UserStatusEnum;

  @Column()
  bio?: string;

  @Column()
  isBooked?: boolean;

  @Column()
  ratePerHour?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relation entity fields //
  @OneToOne(() => Location, (location) => location.user, { eager: true })
  location: Location;

  @OneToMany(() => WeeklyAvailability, (availabilities) => availabilities.user)
  availabilities?: WeeklyAvailability[];
}
