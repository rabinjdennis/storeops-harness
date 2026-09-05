export type EventHandler<TPayload = unknown> = (
  payload: TPayload,
) => void | Promise<void>;

export class EventBus {
  private readonly handlers = new Map<
    string,
    EventHandler[]
  >();

  subscribe<TPayload>(
    eventName: string,
    handler: EventHandler<TPayload>,
  ): void {
    const existingHandlers = this.handlers.get(eventName) ?? [];

    existingHandlers.push(handler as EventHandler);
    this.handlers.set(eventName, existingHandlers);
  }

  async publish<TPayload>(
    eventName: string,
    payload: TPayload,
  ): Promise<void> {
    const eventHandlers = this.handlers.get(eventName) ?? [];

    for (const handler of eventHandlers) {
      await handler(payload);
    }
  }
}