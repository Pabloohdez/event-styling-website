import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface GalleryGroup {
  groupSlug: string;
  groupTitle: string;
  coverImageUrl: string;
  coverVideoUrl: string | null;
  category: string;
  itemCount: number;
  items: Array<{
    id: string;
    title: string;
    slug: string;
    description: string | null;
    category: string;
    imageUrl: string;
    videoUrl: string | null;
    order: number;
  }>;
}

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.galleryItem.findMany({
      orderBy: { order: 'asc' },
    });
  }

  /** Agrupa por group_slug; cada grupo es un recuadro (modal con todas las fotos/vídeos del evento). */
  async findGroups(): Promise<GalleryGroup[]> {
    const items = await this.prisma.galleryItem.findMany({
      orderBy: { order: 'asc' },
    });
    const byGroup = new Map<string, typeof items>();
    for (const item of items) {
      const key = item.groupSlug ?? item.slug;
      if (!byGroup.has(key)) byGroup.set(key, []);
      byGroup.get(key)!.push(item);
    }
    const groups: GalleryGroup[] = [];
    for (const [groupSlug, groupItems] of byGroup) {
      const first = groupItems[0];
      const groupTitle = first.groupTitle ?? first.title;
      groups.push({
        groupSlug,
        groupTitle,
        coverImageUrl: first.imageUrl,
        coverVideoUrl: first.videoUrl,
        category: first.category,
        itemCount: groupItems.length,
        items: groupItems.map((i: (typeof items)[number]) => ({
          id: i.id,
          title: i.title,
          slug: i.slug,
          description: i.description,
          category: i.category,
          imageUrl: i.imageUrl,
          videoUrl: i.videoUrl,
          order: i.order,
        })),
      });
    }
    return groups;
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
