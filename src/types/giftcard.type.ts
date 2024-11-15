import { Field, ObjectType, Float, ID } from '@nestjs/graphql';

@ObjectType()
export class GiftCardType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => Float)
  amount: number;

  @Field()
  businessId: string;

  @Field({ nullable: true })
  image?: string;

  @Field()
  isActive: boolean;
}
