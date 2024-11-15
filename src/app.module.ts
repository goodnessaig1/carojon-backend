import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ImageController } from './controllers/image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from './utils/cloudinary.service';
import { UserService } from './service/users.service';
import { UsersResolver } from './resolvers/users.resolver';
import { User } from './models/user.model';
import { UserController } from './controllers/UserController';
import { Business } from './models/business.model';
import { GiftCard } from './models/giftcard.model';
import { OrderModule } from './modules/order.module';
import { PaymentModule } from './modules/payment.module';
import { ServiceModule } from './modules/service.module';
import { GiftCardModule } from './modules/giftcard.module';
import { parse } from 'pg-connection-string';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const dbConfig = parse(process.env.DATABASE_URL);

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    GiftCardModule,
    ServiceModule,
    PaymentModule,
    OrderModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: dbConfig.host,
      port: +dbConfig.port,
      username: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: {
          require: true, // Ensure SSL is used
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      },
    }),

    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'osemudiame1',
    //   database: 'carojon',
    //   autoLoadModels: true,
    //   synchronize: true,
    // }),

    SequelizeModule.forFeature([User, Business, GiftCard]),
  ],

  providers: [UsersResolver, UserService, CloudinaryService],
  exports: [UserService],
  controllers: [UserController, ImageController],
})
export class AppModule {}
