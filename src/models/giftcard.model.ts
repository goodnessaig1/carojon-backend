import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Business } from './business.model';
import { Order } from './orders.model';

@ObjectType()
@Table
export class GiftCard extends Model {
  @Field(() => ID)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @Column
  title: string;

  @Field()
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  @Field(() => Float)
  @Column
  amount: number;

  @Field()
  @Column
  image: string;

  @Field(() => Int)
  @ForeignKey(() => Business)
  @Column
  businessId: number;

  @BelongsTo(() => Business)
  business: Business;

  @HasMany(() => Order, { as: 'orders' })
  orders: Order[];
}
