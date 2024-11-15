import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from 'src/models/service.model';
import { ServiceResolver } from 'src/resolvers/service.resolver';
import { ServiceService } from 'src/service/service.services';

@Module({
  imports: [SequelizeModule.forFeature([Service])],
  providers: [ServiceService, ServiceResolver],
})
export class ServiceModule {}
