import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UsersResolver } from 'src/resolvers/users.resolver';
import { UserService } from 'src/service/users.service';
// import { User } from '../models/user';
// import { UserService } from '../service/users.service';
// import { UsersResolver } from '../resolvers/users.resolver';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UsersResolver],
})
export class UserModule {}
