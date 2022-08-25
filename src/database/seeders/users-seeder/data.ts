// users data used for seeding

import { IUser } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { UserType } from 'src/users/user-type.enum';
import * as bcrypt from 'bcrypt';

const userTypesArray = [UserType.ADMIN, UserType.CLIENT, UserType.TUTOR, UserType.TUTOR];

async function genSaltedPassword(password: string): Promise<string> {
  // salting and hash password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const users: IUser[] = [];

function populate() {
  for (let i = 0; i < 1000; i++) {
    const randUser = {
      id: uuidv4(),
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      type: userTypesArray[Math.ceil(Math.random() * 3)],
      age: Math.floor(Math.random() * 100),
      username: faker.internet.userName(),
      phone: parseInt(faker.phone.number()),
      email: faker.internet.email(),
      password: `${genSaltedPassword(faker.random.word())}@!D`,
    };

    users.push(randUser);
  }
}

populate();

console.log('Generated Users: ', users);
