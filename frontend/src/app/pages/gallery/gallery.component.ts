import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const API_URL = '/api';

interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  imageUrl: string;
  videoUrl: string | null;
  order: number;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styles: [`
    .page-hero {
      padding: var(--space-2xl) var(--space-xl);
      text-align: center;
      background: var(--color-bg-alt);
    }
    .page-hero h1 { margin-bottom: var(--space-sm); }
    .lead { color: var(--color-text-muted); margin: 0; }
    .content { padding: var(--space-2xl) var(--space-xl); }
    .container { max-width: 64rem; margin: 0 auto; }
    .loading, .error, .muted { text-align: center; color: var(--color-text-muted); }
    .error { color: #b91c1c; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-xl); }
    .card {
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--color-border);
    }
    .media {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
    }
    .card-body { padding: var(--space-lg); }
    .card-body h2 { margin: 0 0 var(--space-xs); font-size: 1.125rem; }
    .category {
      font-size: 0.8125rem;
      color: var(--color-accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .card-body p { margin: var(--space-sm) 0 0; font-size: 0.9375rem; color: var(--color-text-muted); }
  `],
})
export class GalleryComponent {
  private http = inject(HttpClient);
  items = signal<GalleryItem[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.http.get<GalleryItem[]>(`${API_URL}/gallery`).subscribe({
      next: (data) => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la galería.');
        this.loading.set(false);
      },
    });
  }
}
