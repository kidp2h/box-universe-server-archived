import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    console.log('authJwt.guard.ts:8');

    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}
