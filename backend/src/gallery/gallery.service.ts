import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.galleryItem.findMany({
      orderBy: { order: 'asc' },
    });
  }

  findByCategory(category: string) {
    return this.prisma.galleryItem.findMany({
      where: { category },
      orderBy: { order: 'asc' },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.galleryItem.findUnique({
      where: { slug },
    });
  }
}
