import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingStatus } from '../enum/booking-status.enum';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  topic?: string;

  @Column({ nullable: true })
  description?: string;

  // just storing the id's of the subjects
  @Column({ type: 'simple-array' })
  subjects?: string[];

  @Column()
  clientId?: string;

  @Column()
  tutorId?: string;

  // todo: change needed on second version
  @Column({ nullable: true })
  startingTime?: string;

  @Column({ nullable: true })
  endingTime?: string;

  @Column({ default: BookingStatus.REQUESTED })
  status?: BookingStatus;

  @Column({ nullable: true })
  rate?: number;

  @Column({ nullable: true })
  clientReview?: string;

  @Column({ nullable: true })
  clientRating?: number;

  @Column({ nullable: true })
  tutorReview?: string;

  @Column({ nullable: true })
  tutorRating?: number;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  modifiedAt?: Date;
}
