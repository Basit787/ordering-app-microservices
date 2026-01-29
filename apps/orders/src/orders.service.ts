import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(payload: CreateOrderDto) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = this.ordersRepository.create(payload, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          payload,
        }),
      );
      this.logger.log('Order placed successfully');
      await session.commitTransaction();
      return order;
    } catch (error) {
      this.logger.error('Transaction Aborting...');
      await session.abortTransaction();
      this.logger.error('Error while placing order', error);
      throw new BadRequestException();
    }
  }

  async getOrders() {
    try {
      return this.ordersRepository.find({});
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}
