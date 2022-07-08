import { Client } from 'src/clients/entities/client.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingStatus } from '../enum/booking-status.enum';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // list of subjects that are selected for tutoring
  // @ManyToMany(() => Subject)
  // @ManyToMany(() => Subject, {
  //   createForeignKeyConstraints: false,
  // })
  // @JoinTable()
  // subjects?: Subject[];

  // just storing the id's of the subjects
  @Column({ type: 'simple-array' })
  subjects: string[];

  @ManyToOne(() => Client, (client) => client.bookings)
  client?: Client;

  @ManyToOne(() => Tutor, (tutor) => tutor.bookings)
  tutor?: Tutor;

  // todo: change needed on second version
  @Column()
  startingTime: string;

  @Column()
  endingTime: string;

  @Column({ default: BookingStatus.REQUESTED })
  status: BookingStatus;

  @Column()
  rate: number;

  @Column()
  clientReview: string;

  @Column()
  clientRating: number;

  @Column()
  tutorReview: string;

  @Column()
  tutorRating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;
}
