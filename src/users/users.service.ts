import { User } from './users.schema';
import { UserInput } from './dto/user.input';
import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { ObjectId, UpdateResult } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUser(userInput: UserInput): Promise<User> {
    return this.usersRepository.getUser(userInput);
  }

  getListUsers(): Promise<User[]> {
    return this.usersRepository.getListUsers();
  }

  createUser(userInput: UserInput): Promise<User> {
    return this.usersRepository.createUser(userInput);
  }

  updateRefreshToken(userId: string | ObjectId, refreshToken: string): Promise<UpdateResult> {
    return this.usersRepository.updateRefreshToken(userId, refreshToken);
  }
}
