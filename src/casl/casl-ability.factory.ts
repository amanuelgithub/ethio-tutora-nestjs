import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Location } from 'src/users/entities/locations.entity';
import { UserType } from 'src/users/enums/user-type.enum';
import { Booking } from '../bookings/entities/booking.entity';
import { Subject } from '../subjects/entities/subject.entity';
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
  | InferSubjects<
      typeof User | typeof Subject | typeof Booking | typeof Location
    >
  | typeof WeeklyAvailability
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user?.userType === UserType.ADMIN) {
      // gives fullright over-all subjects
      can(Action.Manage, 'all');
    } else if (user?.userType === UserType.CLIENT) {
      can(Action.Manage, Booking);
      can(Action.Read, Booking);
      can(Action.Read, WeeklyAvailability);
      can(Action.Read, Subject);
    } else if (user?.userType === UserType.TUTOR) {
      can(Action.Update, User);
      can(Action.Read, User);
      can(Action.Manage, WeeklyAvailability);
      can(Action.Read, Booking);
      can(Action.Update, Booking);
      can(Action.Read, Subject);

      // Location
      can(Action.Create, Location);
      can(Action.Read, Location);
      can(Action.Update, Location);
      can(Action.Delete, Location);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
