import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { type RmqContext, type RmqOptions, Transport } from "@nestjs/microservices";
import type { Channel, ConsumeMessage } from "amqplib";

@Injectable()
export class RmqService {
  // Explicit token: this package is built without decorator metadata
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

  // Consumer options for this service's own queue; messages stay unacked until the handler calls acknowledgement()
  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.getOrThrow<string>("RABBIT_MQ_URI")],
        queue: this.configService.getOrThrow<string>(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }

  acknowledgement(context: RmqContext) {
    const channel = context.getChannelRef() as Channel;
    const originalMessage = context.getMessage() as ConsumeMessage;
    channel.ack(originalMessage);
  }
}
