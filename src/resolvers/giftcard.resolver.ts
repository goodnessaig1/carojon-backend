import { Resolver, Mutation, Query, Args, Int } from '@nestjs/graphql';
import { CreateGiftCardInput } from 'src/inputs/giftcard.input';
import { GiftCard } from 'src/models/giftcard.model';
import { GiftCardService } from 'src/service/giftcard.service';
import { GiftCardType } from 'src/types/giftcard.type';

@Resolver(() => GiftCardType)
export class GiftCardResolver {
  constructor(private giftCardService: GiftCardService) {}

  @Mutation(() => GiftCardType)
  async createGiftCard(
    @Args('createGiftCardInput') createGiftCardInput: CreateGiftCardInput,
  ) {
    return this.giftCardService.createGiftCard(createGiftCardInput);
  }

  @Query(() => [GiftCard], { name: 'getGiftCardsByBusinessId' })
  async getGiftCardsByBusinessId(
    @Args('businessId', { type: () => Int }) businessId: number,
  ): Promise<GiftCard[]> {
    return this.giftCardService.findGiftCardsByBusinessId(businessId);
  }

  @Mutation(() => GiftCard)
  async deactivateGiftCard(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GiftCard> {
    return this.giftCardService.deactivateGiftCard(id);
  }
}
