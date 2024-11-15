import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { Field, ObjectType, Int, ID } from '@nestjs/graphql';
import { GiftCard } from './giftcard.model';

@ObjectType()
@Table
export class Order extends Model {
  @Field(() => ID)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field(() => Int)
  @Column
  userId: number;

  @Field(() => Int)
  @ForeignKey(() => GiftCard)
  @Column
  giftCardId: number;

  @Field(() => GiftCard, { nullable: true })
  @BelongsTo(() => GiftCard, { as: 'giftCard' })
  giftCard?: GiftCard;
}
