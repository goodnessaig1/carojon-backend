import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/models/user.model';

@ObjectType()
export class UserResponse {
  @Field()
  status: string;

  @Field()
  statusCode: number;

  @Field(() => User)
  user: User;
}
