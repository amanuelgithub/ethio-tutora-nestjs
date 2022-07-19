import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { User } from 'src/users/entities/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Client
      | typeof Tutor
      | typeof Subject
      | typeof Booking
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    console.log('user type:', user.type);

    if (user.type === 'ADMIN') {
      // gives fullright over-all subjects
      can(Action.Manage, 'all');
    } else if (user.type === 'CLIENT') {
      can(Action.Manage, Booking);
    } else if (user.type === 'TUTOR') {
      can(Action.Read, Booking);
      can(Action.Update, Booking);

      cannot(Action.Create, Subject).because('You are not an admin!!');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
