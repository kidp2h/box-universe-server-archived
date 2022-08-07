import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsJWT, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { ObjectId } from 'mongodb';
import { IsObjectId } from '@decorators/IsObjectId.decorator';

import { User } from '../users.schema';

@ArgsType()
@InputType()
export class UserInput {
  @IsOptional()
  @IsString()
  @IsObjectId()
  @Field(() => String, { nullable: true })
  _id?: string | ObjectId | User;

  @IsOptional()
  @IsString()
  @Length(6, 15)
  @Field(() => String, { nullable: true })
  username?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  @Length(6)
  password?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @IsJWT()
  @Field(() => String, { nullable: true })
  refreshToken?: string;
}
