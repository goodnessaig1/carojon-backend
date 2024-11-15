import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Business } from './business.model';

@ObjectType()
@Table
export class Service extends Model {
  @Field(() => ID)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Field()
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price: number;

  @Field(() => Int)
  @ForeignKey(() => Business)
  @Column
  businessId: number;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
}
