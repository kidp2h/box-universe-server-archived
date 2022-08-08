import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserInput } from '@users/dto/user.input';
import { LocalAuthGuard } from 'src/common/guards/authLocal.guard';
import { AuthService } from './auth.service';
import { LoginResponse } from './types/LoginResponse';
import { AccessTokenResponse } from './types/AccessTokenResponse';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse, {
    name: 'login',
    nullable: true,
  })
  @UseGuards(LocalAuthGuard)
  public login(@Args('userInput') userInput: UserInput, @Context() context: any) {
    return this.authService.login(context.user._doc);
  }

  @Query(() => AccessTokenResponse, { name: 'refreshAccessToken', nullable: true })
  public refreshAccessToken(@Args('userInput') userInput: UserInput) {
    return this.authService.refreshAccessToken(userInput);
  }
}
