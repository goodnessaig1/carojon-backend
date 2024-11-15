import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Business } from 'src/models/business.model';

@ObjectType()
export class UserWithBusiness {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  fullname: string;

  @Field()
  userType: 'client' | 'biz_manager';

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;

  @Field(() => Business, { nullable: true })
  business?: {
    id: number;
    name: string;
    description: string;
  } | null; // Adjust according to your model structure
}
