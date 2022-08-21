// subjects data used for seeding
import { faker } from '@faker-js/faker';

import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'src/subjects/entities/subject.entity';

export const subjects: Subject[] = [];

const sub = [
  { id: uuidv4(), name: 'English', description: 'English Speaking, Writing and more.' },
  { id: uuidv4(), name: 'Math', description: 'Math for Grade 8 and above students.' },
  { id: uuidv4(), name: 'Programming', description: 'Fundamentals of programming using python programming language' },
];

sub.map((subject) => subjects.push(subject));
