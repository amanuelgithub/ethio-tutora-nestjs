import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tutor } from './tutor.entity';

@Entity()
export class WeeklyAvailability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  day: string; // "Monday"

  @Column({ nullable: true })
  from: string; // "10:00 pm"

  @Column({ nullable: true })
  to: string; // "1:00 am"

  @ManyToOne((_type) => Tutor, (tutor) => tutor.weeklyAvailabilities)
  tutor: Tutor;
}
