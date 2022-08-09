import { UserInput } from './dto/user.input';
import { RequireAtLeast } from '@pipes/RequireAtLeast.pipe';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.schema';
import { UsersService } from './users.service';
import { UseFilters, UseGuards } from '@nestjs/common';
import { ValidationExceptionFilter } from '@exceptions/validation.exception';
import { JwtAuthGuard } from '@guards/authJwt.guard';
import Current from '@decorators/Current.decorator';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, {
    name: 'me',
    nullable: true,
  })
  async getMe(@Current() user: User): Promise<User> {
    return user;
  }

  @Query(() => User, {
    name: 'getUser',
    nullable: true,
  })
  async getUser(@Args('userInput', new RequireAtLeast()) userInput: UserInput): Promise<User> {
    return this.usersService.getUser(userInput);
  }

  @Query(() => [User], {
    name: 'getListUsers',
    nullable: true,
  })
  async getListUsers(): Promise<User[]> {
    return this.usersService.getListUsers();
  }
  @Mutation(() => User, {
    name: 'createUser',
    nullable: true,
  })
  @UseFilters(ValidationExceptionFilter)
  async createUser(@Args('userInput', new RequireAtLeast()) userInput: UserInput): Promise<User> {
    return await this.usersService.createUser(userInput);
  }
}
