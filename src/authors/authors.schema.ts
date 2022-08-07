import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { UpperMiddleware } from 'src/common/middlewares/upper.middleware';
import { Task } from 'src/tasks/tasks.schema';

export type AuthorDocument = Author & mongoose.Document;

@Schema({ timestamps: true })
@ObjectType()
export class Author {
  @Field(() => String, { nullable: false, middleware: [UpperMiddleware] })
  _id: ObjectId;

  @Field(() => String, { nullable: false, middleware: [UpperMiddleware] })
  @Prop({
    required: [true, 'Name author should be not empty'],
    type: mongoose.Schema.Types.String,
    unique: true,
  })
  name: string;

  @Field(() => [Task], { nullable: false })
  @Prop({
    type: mongoose.Schema.Types.Array,
  })
  tasks: [Task];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
