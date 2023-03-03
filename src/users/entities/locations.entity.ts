import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export interface ILocation {
  latitude: string;
  longitude: string;
  city?: string;
  locality?: string;
  region?: string;
}

@Entity()
export class Location implements ILocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  city: string;

  @Column()
  locality: string;

  @Column()
  region: string;

  @Column({ unique: true })
  userId: string;

  @OneToOne(() => User, (user) => user.location)
  user: User;
}
