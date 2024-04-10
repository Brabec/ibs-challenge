import { ContactEntity } from '@contacts/entity/contact.entity';

export const contacts: ContactEntity[] = [
  {
    id: 1,
    name: 'Anvil Feet',
    email: 'anvilfeet@email.com',
    sex: 'M',
    birth: new Date('1995-03-01'),
    maritalStatus: 'divorced',
  },
  {
    id: 2,
    name: 'Plinio',
    email: 'plinio@email.com',
    sex: 'M',
    birth: new Date('2010-01-02'),
    maritalStatus: 'single',
  },
  {
    id: 3,
    name: 'Cyara',
    email: 'cyara@email.com',
    sex: 'F',
    birth: new Date('1980-01-02'),
    maritalStatus: 'divorced',
  },
  {
    id: 4,
    name: 'Kiave',
    email: 'kiave@email.com',
    sex: 'F',
    birth: new Date('2000-01-02'),
    maritalStatus: 'married',
  },
];
