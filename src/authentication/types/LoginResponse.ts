import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@users/users.schema';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
