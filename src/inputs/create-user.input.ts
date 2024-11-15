import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  fullname: string;

  @Field()
  userType: 'client' | 'biz_manager';

  @Field({ nullable: true })
  businessName?: string;

  @Field({ nullable: true })
  businessDescription?: string;
}
