import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Order } from 'src/models/orders.model';
import { OrderService } from 'src/service/orders.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  async getOrdersByUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.orderService.findOrdersByUserId(userId);
  }
}
