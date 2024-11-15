import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.model';

@ObjectType()
@Table
export class Business extends Model<Business> {
  @Field(() => ID)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Field()
  @Column({ type: DataType.STRING })
  description: string;

  @ForeignKey(() => User)
  @Column
  ownerId: number;
}
