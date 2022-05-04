import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookedStatus } from '../enum/booked-status.enum';
import { SkillType } from '../enum/skills.enum';
import { WeeklyAvailability } from './weekly-availbility.entity';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @Column({ nullable: true })
  //   tutoringSkills: SkillType[];

  @Column({ default: BookedStatus.OPEN })
  isBooked: BookedStatus;

  @Column({ nullable: true })
  paymentRatePerHour: number;

  @Column({ nullable: true })
  higherEducationLevel: string;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => WeeklyAvailability, (availability) => availability.tutor, {
    eager: true,
  })
  weeklyAvailabilities: WeeklyAvailability[];
}
