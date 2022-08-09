import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

const Current = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const context = GqlExecutionContext.create(ctx);
  console.log('Current.decorator.ts:6');

  return context.getContext().req.user;
});
export default Current;
