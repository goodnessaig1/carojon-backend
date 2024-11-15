import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class ServiceType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  businessId: string;

  @Field()
  description: string;
}
