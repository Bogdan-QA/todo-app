import { test } from '@playwright/test';

function formatMessage(message: string, args: unknown[]): string {
  return message.replace(/\{(\d+)\}/g, (_, index) => String(args[Number(index)]));
}

export function step<This, Args extends unknown[], Return>(
  message?: string
) {
  return function actualDecorator(
    target: (this: This, ...args: Args) => Promise<Return>,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>
  ) {
    const methodName = String(context.name);

    return async function (this: This, ...args: Args): Promise<Return> {
      const name = message
        ? formatMessage(message, args)
        : `${(this as any).constructor?.name ?? 'UnknownClass'}.${methodName}`;

      return await test.step(name, async () => target.apply(this, args));
    };
  };
}
