import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentInput } from 'src/inputs/payment.input';
import { GiftCard } from 'src/models/giftcard.model';
import { Order } from 'src/models/orders.model';
import { Payment } from 'src/models/payment.model';
import { User } from 'src/models/user.model';
// import { Payment } from '../models/payment.model';
// import { GiftCard } from 'src/models/giftcard.model';
// import { User } from 'src/models/user.model';
// import { CreatePaymentInput } from '../inputs/payment.input';
// import { Order } from 'src/models/orders.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment)
    private readonly paymentModel: typeof Payment,
    @InjectModel(GiftCard)
    private readonly giftCardModel: typeof GiftCard,
    @InjectModel(Order)
    private readonly orderModel: typeof GiftCard,
  ) {}
  async createPayment(
    createPaymentInput: CreatePaymentInput,
  ): Promise<Payment> {
    const giftCard = await this.giftCardModel.findByPk(
      createPaymentInput.giftCardId,
    );

    if (!giftCard) {
      throw new Error('Gift card not found.');
    }

    // Check if the gift card is active
    if (!giftCard.isActive) {
      throw new Error('This gift card cannot be redeemed.');
    }

    // Deactivate the gift card
    giftCard.isActive = false;
    await giftCard.save();

    // Create and save the payment
    const payment = new this.paymentModel({
      ...createPaymentInput,
    });

    // Create the order associated with this payment
    await this.orderModel.create({
      ...createPaymentInput,
      paymentId: payment.id, // Link the order to the payment
    });
    return payment.save();
  }

  async findPaymentsByUserId(userId: number): Promise<Payment[]> {
    return this.paymentModel.findAll({
      where: { userId },
      include: [User, GiftCard],
    });
  }
}
