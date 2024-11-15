import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GiftCard } from 'src/models/giftcard.model';
import { Order } from 'src/models/orders.model';
import { Payment } from 'src/models/payment.model';
import { PaymentResolver } from 'src/resolvers/paymen.resolver';
import { PaymentService } from 'src/service/payment.services';

@Module({
  imports: [SequelizeModule.forFeature([Payment, GiftCard, Order])],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentModule {}
