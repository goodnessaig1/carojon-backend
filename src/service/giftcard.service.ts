import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGiftCardInput } from 'src/inputs/giftcard.input';
import { GiftCard } from 'src/models/giftcard.model';

@Injectable()
export class GiftCardService {
  constructor(
    @InjectModel(GiftCard)
    private giftCardModel: typeof GiftCard,
  ) {}

  async createGiftCard(
    createGiftCardInput: CreateGiftCardInput,
  ): Promise<GiftCard> {
    const giftCard = new this.giftCardModel({
      ...createGiftCardInput,
    });

    return giftCard.save();
  }

  async findGiftCardsByBusinessId(businessId: number): Promise<GiftCard[]> {
    return this.giftCardModel.findAll({
      where: { businessId },
      order: [['createdAt', 'DESC']],
    });
  }

  async deactivateGiftCard(id: number): Promise<GiftCard> {
    // Find the gift card by ID
    const giftCard = await this.giftCardModel.findByPk(id);
    if (!giftCard) {
      throw new NotFoundException('Gift card not found');
    }
    if (!giftCard.isActive) {
      throw new BadRequestException('Gift card is already deactivated');
    }
    // Update the isActive field to false
    giftCard.isActive = false;
    await giftCard.save();
    return giftCard;
  }
}
