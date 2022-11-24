import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Booking } from '../bookings/entities/booking.entity';
import { Client } from '../clients/entities/client.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { Tutor } from '../tutors/entities/tutor.entity';
import { WeeklyAvailability } from '../tutors/entities/weekly-availbility.entity';
import { User } from '../users/entities/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects =
  | InferSubjects<typeof User | typeof Client | typeof Tutor | typeof Subject | typeof Booking>
  | typeof WeeklyAvailability
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);

    if (user.type === 'ADMIN') {
      // gives fullright over-all subjects
      can(Action.Manage, 'all');
    } else if (user.type === 'CLIENT') {
      can(Action.Manage, Booking);
      can(Action.Read, WeeklyAvailability);
      can(Action.Read, Subject);
    } else if (user.type === 'TUTOR') {
      can(Action.Update, Tutor);
      can(Action.Update, User);
      can(Action.Read, User);
      can(Action.Manage, WeeklyAvailability);
      can(Action.Read, Booking);
      can(Action.Update, Booking);
      can(Action.Read, Subject);
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
