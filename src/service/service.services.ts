import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateServiceInput } from 'src/inputs/service.input';
import { Service } from 'src/models/service.model';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service)
    private serviceModel: typeof Service,
  ) {}

  async createService(
    createServiceInput: CreateServiceInput,
  ): Promise<Service> {
    const service = new this.serviceModel({
      ...createServiceInput,
    });

    return service.save();
  }

  async findServicesByBusinessId(businessId: number): Promise<Service[]> {
    return this.serviceModel.findAll({ where: { businessId } });
  }
}
