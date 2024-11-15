import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field()
  userId: number;

  @Field()
  giftCardId: number;
}
