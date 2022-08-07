import { Injectable } from '@nestjs/common';
import { DeleteResult, ObjectId } from 'mongodb';
import { AuthorsRepository } from './authors.repository';
import { Author } from './authors.schema';
import { AuthorInput } from './dto/author.input';

@Injectable()
export class AuthorsService {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async deleteAuthor(authorInput: AuthorInput): Promise<DeleteResult> {
    return this.authorsRepository.deleteAuthor(authorInput);
  }
  async createAuthor(authorInput: AuthorInput): Promise<Author> {
    return this.authorsRepository.createAuthor(authorInput);
  }
  async getListAuthors(): Promise<Author[]> {
    return this.authorsRepository.getListAuthors();
  }
  async getAuthor(authorInput: AuthorInput): Promise<Author> {
    return this.authorsRepository.getAuthor(authorInput);
  }
}
