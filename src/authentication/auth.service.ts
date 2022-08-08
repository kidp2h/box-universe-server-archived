import { Injectable } from '@nestjs/common';
import { User } from '@users/users.schema';
import { UsersService } from '@users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './types/LoginResponse';
import { UserInput } from '@users/dto/user.input';
import { Payload } from './types/Payload';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.getUser({ username });

    const isCorrect = compareSync(password, user?.password || '');
    if (user && isCorrect) {
      const {
        password: {},
        ...result
      } = user;
      return result;
    } else {
      return null;
    }
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
  public login(user: User): LoginResponse {
    const payload: Payload = { username: user.username, sub: user._id };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.TIME_EXPIRE_REFRESH_TOKEN,
    });
    this.usersService.updateRefreshToken(user._id, refreshToken);
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        ...user,
        refreshToken: refreshToken,
      },
    };
  }

  public async refreshAccessToken(userInput: UserInput) {
    const { _id, refreshToken } = userInput;
    const user = await this.usersService.getUser({ _id });
    const payload: Payload = { username: user.username, sub: user._id };

    if (user.refreshToken === refreshToken)
      return {
        accessToken: this.jwtService.sign(payload, {
          expiresIn: process.env.TIME_EXPIRE_ACCESS_TOKEN,
        }),
      };
    return null;
  }
}
