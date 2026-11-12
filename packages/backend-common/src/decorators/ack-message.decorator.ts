import { UseInterceptors } from "@nestjs/common";
import { RmqAckInterceptor } from "../rmq/rmq-ack.interceptor.js";

// Acks the RabbitMQ message once the handler has finished, whether it succeeded or threw
export const AckMessage = () => UseInterceptors(RmqAckInterceptor);
