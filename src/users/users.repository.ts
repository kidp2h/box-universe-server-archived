import { UserInput } from './dto/user.input';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { ObjectId, UpdateResult } from 'mongodb';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

   async getUser(userInput: UserInput): Promise<User> {
    return this.userModel.findOne(userInput);
  }

  async getListUsers(): Promise<User[]> {
    return this.userModel.find({});
  }

  async createUser(userInput: UserInput): Promise<User> {
    const createdUser = new this.userModel(userInput);
    return createdUser.save();
  }

  async updateRefreshToken(userId: string | ObjectId, refreshToken: string): Promise<UpdateResult> {
    return this.userModel.updateOne({ _id: userId }, { refreshToken });
  }
}
