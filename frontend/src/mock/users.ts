import { User } from '../types/database'
import _ from 'lodash'

export const users: User[] = [
  {
    id: 'eli7vh',
    username: 'eli7vh',
    password: 'toffee15',
    name: 'Elijah Lucian',
    email: 'elijahlucian@gmail.com',
  },
  {
    id: 'chocobobafett',
    username: 'chocobobafett',
    password: 'toffee15',
    name: 'George',
    email: 'berkleegeorge@gmail.com',
  },
  {
    id: 'metacusis',
    username: 'metacusis',
    password: 'toffee15',
    name: 'Meta',
    email: 'cjamieschmitz@gmail.com',
  },
  {
    id: 'jasonone',
    username: 'Jason One',
    password: 'toffee15',
    name: 'Meta',
    email: 'Jason@danceshout.com',
  },
  {
    id: 'iwishiwereadinosaur',
    username: 'iwishiwereadinosaur',
    password: 'toffee15',
    name: 'iwishiwereadinosaur',
    email: 'iwishiwere@adinosaur.net',
  },
]

export const userIndex = _.keyBy(users, 'id')
export const userByUsername = _.keyBy(users, 'username')
