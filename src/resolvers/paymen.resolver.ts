import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { CreatePaymentInput } from 'src/inputs/payment.input';
import { Payment } from 'src/models/payment.model';
import { PaymentService } from 'src/service/payment.services';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  async createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ): Promise<Payment> {
    return this.paymentService.createPayment(createPaymentInput);
  }

  @Query(() => [Payment], { name: 'getPaymentsByUserId' })
  async getPaymentsByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Payment[]> {
    return this.paymentService.findPaymentsByUserId(userId);
  }
}
