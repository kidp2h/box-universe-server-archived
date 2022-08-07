import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { IsObjectId } from '@decorators/IsObjectId.decorator';
import { Task } from '../tasks.schema';

@ArgsType()
@InputType()
export class TaskInput {
  @IsOptional()
  @IsString()
  @IsObjectId()
  @Field(() => String, { nullable: true })
  _id?: string | ObjectId | Task;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  title?: string;

  @IsOptional()
  @IsString()
  @IsObjectId()
  @Field(() => String, { nullable: true })
  author?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;
}
