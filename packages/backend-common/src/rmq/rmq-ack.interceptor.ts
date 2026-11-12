import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from "@nestjs/common";
import type { RmqContext } from "@nestjs/microservices";
import type { Channel, ConsumeMessage } from "amqplib";
import { finalize, type Observable } from "rxjs";

// Consumers use noAck: false; without an ack a message is redelivered forever, so ack after every handler
@Injectable()
export class RmqAckInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const rmq = context.switchToRpc().getContext<RmqContext>();
    return next.handle().pipe(finalize(() => (rmq.getChannelRef() as Channel).ack(rmq.getMessage() as ConsumeMessage)));
  }
}
