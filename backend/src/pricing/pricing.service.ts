import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.pricingPackage.findMany({
      orderBy: { order: 'asc' },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.pricingPackage.findUnique({
      where: { slug },
    });
  }
}
