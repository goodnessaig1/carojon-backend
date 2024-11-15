import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GiftCard } from 'src/models/giftcard.model';
import { Order } from 'src/models/orders.model';
import { OrderResolver } from 'src/resolvers/orders.resolver';
import { OrderService } from 'src/service/orders.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, GiftCard])],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
