import { Controller, Get, Param } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.galleryService.findByCategory(category);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.galleryService.findBySlug(slug);
  }
}
