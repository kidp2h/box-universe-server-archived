import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'mongodb';
import { AuthorsRepository } from 'src/authors/authors.repository';
import { Author } from 'src/authors/authors.schema';
import { AuthorInput } from 'src/authors/dto/author.input';
import { TaskInput } from './dto/task.input';
import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.schema';

@Injectable()
export class TasksService {
  constructor(
    private readonly authorsRepository: AuthorsRepository,
    private readonly tasksRepository: TasksRepository,
  ) {}

  async createTask(taskInput: TaskInput): Promise<Task> {
    const task = await this.tasksRepository.createTask(taskInput);
    this.authorsRepository.addTaskForAuthor(taskInput.author, task);
    return task;
  }

  async getTask(taskInput: TaskInput): Promise<Task> {
    return this.tasksRepository.getTask(taskInput);
  }

  async getListTasks(): Promise<Task[]> {
    return this.tasksRepository.getListTasks();
  }

  async deleteTask(taskInput: TaskInput): Promise<DeleteResult> {
    return this.tasksRepository.deleteTask(taskInput);
  }

  // async getListTasksOfAuthor(authorInput: AuthorInput | Author): Promise<Task[]> {
  //   // return this.authorsRepository.getAuthor(authorInput);
  // }
}
