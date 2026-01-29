import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateOrder } from '../types/api.types';

export class CreateOrderDto implements CreateOrder {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
