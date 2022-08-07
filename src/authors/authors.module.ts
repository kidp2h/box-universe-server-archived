import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from 'src/tasks/tasks.module';
import { AuthorsRepository } from './authors.repository';
import { AuthorsResolver } from './authors.resolver';
import { Author, AuthorSchema } from './authors.schema';
import { AuthorsService } from './authors.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    forwardRef(() => TasksModule),
  ],
  providers: [AuthorsService, AuthorsRepository, AuthorsResolver],
  exports: [AuthorsService, AuthorsRepository],
})
export class AuthorsModule {}
