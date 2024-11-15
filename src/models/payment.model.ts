import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from './user.model';
import { GiftCard } from './giftcard.model';

@ObjectType()
@Table
export class Payment extends Model {
  @Field(() => ID)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field(() => Int)
  @ForeignKey(() => GiftCard)
  @Column
  giftCardId: number;

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => GiftCard)
  giftcard: GiftCard;
}
