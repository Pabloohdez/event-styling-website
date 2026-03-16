import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GalleryModule } from './gallery/gallery.module';
import { ServicesModule } from './services/services.module';
import { PricingModule } from './pricing/pricing.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    PrismaModule,
    GalleryModule,
    ServicesModule,
    PricingModule,
    ContactModule,
  ],
})
export class AppModule {}
