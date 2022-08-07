import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { IsObjectId } from 'src/common/decorators/IsObjectId.decorator';
import { Author } from '../authors.schema';

@InputType()
export class AuthorInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsObjectId()
  @IsOptional()
  _id?: string | ObjectId | Author;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}
