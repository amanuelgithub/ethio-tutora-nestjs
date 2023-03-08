import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookingNotifications {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  read: boolean;

  @Column()
  bookingId: string;

  @Column()
  message: string;

  @Column()
  tutorId: string;
}
