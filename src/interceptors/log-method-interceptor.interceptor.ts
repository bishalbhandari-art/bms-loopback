import {
  globalInterceptor,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';

/**
 * Global interceptor that logs request execution time.
 */
@globalInterceptor('logging', {
  tags: {name: 'LogMethodInterceptor'},
})
export class LogMethodInterceptor implements Provider<Interceptor> {
  value() {
    return this.intercept.bind(this);
  }

  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    const startTime = Date.now();

    console.log(`[Interceptor] Starting: ${invocationCtx.methodName}`);

    try {
      const result = await next();

      const duration = Date.now() - startTime;

      console.log(
        `[Interceptor] Completed: ${invocationCtx.methodName} in ${duration}ms`,
      );

      return result;
    } catch (err) {
      const duration = Date.now() - startTime;

      console.log(
        `[Interceptor] Failed: ${invocationCtx.methodName} after ${duration}ms`,
      );

      throw err;
    }
  }
}
