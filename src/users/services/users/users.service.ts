import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/users/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'Surender', email: 'surender@test.com' },
    { username: 'Abhi', email: 'abhi@test.com' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userData: CreateUserType) {
    this.fakeUsers.push(userData);
  }

  getUserById(id) {
    return { id, username: 'Surender', email: 'surender@test.com' };
  }
}
