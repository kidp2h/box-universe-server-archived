import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './tasks.schema';
import { TasksRepository } from './tasks.repository';
import { TasksResolver } from './tasks.resolver';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    forwardRef(() => AuthorsModule),
  ],
  providers: [TasksService, TasksRepository, TasksResolver],
  exports: [TasksService],
})
export class TasksModule {}
