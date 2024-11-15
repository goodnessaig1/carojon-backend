import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GiftCard } from 'src/models/giftcard.model';
import { GiftCardResolver } from 'src/resolvers/giftcard.resolver';
import { GiftCardService } from 'src/service/giftcard.service';
import { CloudinaryService } from 'src/utils/cloudinary.service';

@Module({
  imports: [SequelizeModule.forFeature([GiftCard])],
  providers: [GiftCardService, GiftCardResolver, CloudinaryService],
})
export class GiftCardModule {}
