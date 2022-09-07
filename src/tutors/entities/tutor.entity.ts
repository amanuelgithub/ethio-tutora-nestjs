import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TutorBookedStatus } from '../enum/tutor-booked-status.enum';
import { WeeklyAvailability } from './weekly-availbility.entity';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ default: TutorBookedStatus.OPEN })
  isBooked: TutorBookedStatus;

  @Column({ nullable: true })
  paymentRatePerHour: number;

  @Column({ nullable: true })
  higherEducationLevel: string;

  @OneToOne((type) => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => WeeklyAvailability, (availability) => availability.tutor, {
    eager: true,
  })
  weeklyAvailabilities: WeeklyAvailability[];
}
