import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RequireAtLeast } from '@pipes/RequireAtLeast.pipe';
import { Author } from 'src/authors/authors.schema';
import { AuthorsService } from 'src/authors/authors.service';
import { TaskInput } from './dto/task.input';
import { Task } from './tasks.schema';
import { TasksService } from './tasks.service';

@Injectable()
@Resolver(() => Task)
export class TasksResolver {
  constructor(
    @Inject(forwardRef(() => AuthorsService)) private readonly authorsService: AuthorsService,
    private readonly tasksService: TasksService,
  ) {}

  @Query(() => Task, {
    name: 'getTask',
    nullable: true,
  })
  async getTask(@Args('taskInput', new RequireAtLeast()) taskInput: TaskInput): Promise<Task> {
    return this.tasksService.getTask(taskInput);
  }

  @Query(() => [Task], {
    name: 'getListTasks',
    nullable: true,
  })
  async getListTasks(): Promise<Task[]> {
    return this.tasksService.getListTasks();
  }

  @Mutation(() => Task, {
    name: 'createTask',
  })
  async createTask(@Args('taskInput') taskInput: TaskInput) {
    return this.tasksService.createTask(taskInput);
  }

  @Mutation(() => String, {
    name: 'deleteTask',
    nullable: true,
  })
  async deleteTask(@Args('taskInput', new RequireAtLeast()) taskInput: TaskInput) {
    this.tasksService.deleteTask(taskInput);
    return 'true';
  }

  @ResolveField('author', () => Author, { nullable: false })
  async getAuthor(@Parent() task: Task) {
    const taskInput = {
      _id: task.author,
    };
    return this.authorsService.getAuthor(taskInput);
  }
}
