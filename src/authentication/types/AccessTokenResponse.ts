import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenResponse {
  @Field()
  accessToken: string;
}
