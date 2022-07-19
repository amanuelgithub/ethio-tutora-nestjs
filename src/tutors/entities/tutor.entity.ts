import { Booking } from 'src/bookings/entities/booking.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TutorBookedStatus } from '../enum/tutor-booked-status.enum';
import { WeeklyAvailability } from './weekly-availbility.entity';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => Booking, (booking) => booking.tutor, { eager: true })
  bookings: Booking[];
}
