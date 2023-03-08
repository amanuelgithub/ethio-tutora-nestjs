import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class Schedule implements ISchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';

  @Column()
  startingTime: string;

  @Column()
  endingTime: string;

  @ManyToOne(() => Booking, (booking) => booking.schedules, {
    onDelete: 'CASCADE',
  })
  booking: Booking;
}

export interface ISchedule {
  id: string;
  day:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';
  startingTime: string;
  endingTime: string;
}
