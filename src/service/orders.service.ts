import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GiftCard } from 'src/models/giftcard.model';
import { Order } from 'src/models/orders.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
  ) {}

  async findOrdersByUserId(userId: number): Promise<Order[]> {
    const orders = await this.orderModel.findAll({
      where: { userId },
      include: [
        {
          model: GiftCard,
          as: 'giftCard',
        },
      ],
    });
    return orders;
  }
}
