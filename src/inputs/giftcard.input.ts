import { InputType, Field, Float } from '@nestjs/graphql';
import { IsBoolean, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateGiftCardInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => Float)
  amount: number;

  @Field()
  businessId: string;

  @Field({ defaultValue: true })
  @IsBoolean()
  isActive: boolean;

  @Field()
  image: string;
}
