import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { Author } from 'src/authors/authors.schema';

export type TaskDocument = Task & mongoose.Document;

@Schema({
  timestamps: true,
})
@ObjectType()
export class Task {
  @Field(() => String, { nullable: false })
  _id: ObjectId;

  @Field(() => String, { nullable: false })
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  title: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  description: string;

  @Field(() => Author, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true })
  author: Author;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
