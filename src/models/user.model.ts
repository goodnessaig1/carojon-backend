import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasOne,
} from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import { Business } from './business.model';

@ObjectType()
@Table
export class User extends Model<User> {
  @Field(() => ID)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Field()
  @Column({ type: DataType.STRING, allowNull: false })
  fullname: string;

  @Field()
  @Column({
    type: DataType.ENUM('client', 'biz_manager'),
    allowNull: false,
  })
  userType: 'client' | 'biz_manager';

  @Field(() => Business, { nullable: true })
  @HasOne(() => Business)
  business: Business;

  @BeforeCreate
  static async hashPassword(user: User) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  @Field(() => String)
  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Field(() => String)
  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
