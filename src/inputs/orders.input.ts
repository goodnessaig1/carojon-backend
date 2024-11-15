import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OrdersInput {
  @Field()
  userId: number;

  @Field()
  giftCardId: number;
}
