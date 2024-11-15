import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { CreateServiceInput } from 'src/inputs/service.input';
import { Service } from 'src/models/service.model';
import { ServiceService } from 'src/service/service.services';
import { ServiceType } from 'src/types/service.type';

@Resolver(() => ServiceType)
export class ServiceResolver {
  constructor(private serviceService: ServiceService) {}

  @Mutation(() => ServiceType)
  async createService(
    @Args('createServiceInput') createServiceInput: CreateServiceInput,
  ) {
    return this.serviceService.createService(createServiceInput);
  }

  @Query(() => [Service], { name: 'getServicesByBusinessId' })
  async getServicesByBusinessId(
    @Args('businessId', { type: () => Int }) businessId: number,
  ): Promise<Service[]> {
    return this.serviceService.findServicesByBusinessId(businessId);
  }
}
