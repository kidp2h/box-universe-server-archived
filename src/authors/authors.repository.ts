import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, UpdateResult } from 'mongodb';
import { Model } from 'mongoose';
import { Task } from 'src/tasks/tasks.schema';
import { Author, AuthorDocument } from './authors.schema';
import { AuthorInput } from './dto/author.input';

@Injectable()
export class AuthorsRepository {
  constructor(@InjectModel(Author.name) private authorModel: Model<AuthorDocument>) {}

  async createAuthor(authorInput: AuthorInput | Author): Promise<Author> {
    const createdAuthor = new this.authorModel(authorInput);
    return createdAuthor.save();
  }
  async deleteAuthor(authorInput: AuthorInput): Promise<DeleteResult> {
    return this.authorModel.deleteOne(authorInput);
  }
  async getListAuthors(): Promise<Author[]> {
    return await this.authorModel.find({});
  }
  async getAuthor(authorInput: AuthorInput): Promise<Author> {
    return this.authorModel.findOne(authorInput);
  }
  async addTaskForAuthor(authorId: string, task: Task): Promise<UpdateResult> {
    return this.authorModel.updateOne(
      {
        _id: authorId,
      },
      { $push: { tasks: task } },
    );
  }
}
