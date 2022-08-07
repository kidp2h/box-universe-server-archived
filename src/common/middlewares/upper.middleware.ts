import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const UpperMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
  const value = await next();
  if (value instanceof Object) {
    return value.toString();
  }
  return value.toUpperCase();
};
