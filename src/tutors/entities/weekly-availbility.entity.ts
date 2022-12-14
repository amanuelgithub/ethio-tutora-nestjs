import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DaysEnum } from '../enum/days.enum';

@Entity()
export class WeeklyAvailability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DaysEnum })
  day: DaysEnum;

  @Column()
  times: string;

  @ManyToOne(() => User, (user) => user.availabilities)
  user: User;
}
