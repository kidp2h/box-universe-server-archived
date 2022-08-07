import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './tasks.schema';
import { Model } from 'mongoose';
import { TaskInput } from './dto/task.input';
import { DeleteResult } from 'mongodb';

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(taskInput: TaskInput): Promise<Task> {
    const createdTask = new this.taskModel(taskInput);
    return createdTask.save();
  }

  async getTask(taskInput: TaskInput): Promise<Task> {
    return this.taskModel.findOne(taskInput);
  }

  async getListTasks(): Promise<Task[]> {
    return this.taskModel.find({});
  }

  async deleteTask(taskInput: TaskInput): Promise<DeleteResult> {
    return this.taskModel.deleteOne(taskInput);
  }
}
