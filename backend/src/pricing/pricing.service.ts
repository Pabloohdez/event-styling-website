import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const packages = await this.prisma.pricingPackage.findMany({
      orderBy: { order: 'asc' },
    });
    return packages.map((p: (typeof packages)[number]) => ({
      ...p,
      price: Math.round(Number(p.price)),
    }));
  }

  async findBySlug(slug: string) {
    const p = await this.prisma.pricingPackage.findUnique({
      where: { slug },
    });
    if (!p) return null;
    return { ...p, price: Math.round(Number(p.price)) };
  }
}
