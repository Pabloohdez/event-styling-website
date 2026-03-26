import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

const API_URL = '/api';

interface GalleryItemMedia {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  imageUrl: string;
  videoUrl: string | null;
  order: number;
}

interface GalleryGroup {
  groupSlug: string;
  groupTitle: string;
  coverImageUrl: string;
  coverVideoUrl: string | null;
  category: string;
  itemCount: number;
  items: GalleryItemMedia[];
}

@Component({
  selector: 'app-gallery',
  imports: [ScrollRevealDirective],
  templateUrl: './gallery.component.html',
  styles: [`
    .page-hero {
      padding: var(--space-4xl) var(--space-xl) var(--space-2xl);
      text-align: center;
      background: var(--color-bg);
      position: relative;
      overflow: hidden;
    }
    .page-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 20% 50%, rgba(184,132,138,0.08), transparent 50%),
        radial-gradient(ellipse at 80% 50%, rgba(196,150,122,0.06), transparent 50%);
      pointer-events: none;
    }
    .page-hero h1 { margin: 0 0 var(--space-sm); animation: fadeInUp 0.8s var(--ease-out) both; }
    .hero-line {
      width: 3.5rem;
      height: 2px;
      background: linear-gradient(90deg, var(--color-accent), var(--color-accent-gold));
      border-radius: 2px;
      margin: var(--space-md) auto;
      animation: lineGrow 0.6s var(--ease-out) 0.3s both;
      transform-origin: center;
    }
    .lead {
      color: var(--color-text-muted);
      margin: 0;
      font-size: 1.0625rem;
      animation: fadeInUp 0.8s var(--ease-out) 0.15s both;
    }
    .content { padding: var(--space-2xl) var(--space-xl) var(--space-4xl); }
    .container { max-width: 68rem; margin: 0 auto; }

    /* Skeleton */
    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space-xl);
    }
    .skeleton-card {
      border-radius: var(--radius-lg);
      overflow: hidden;
      .sk-img { width: 100%; aspect-ratio: 4 / 3; }
      .sk-body { padding: var(--space-lg); }
      .sk-title { width: 65%; height: 18px; margin-bottom: var(--space-sm); border-radius: var(--radius-sm); }
      .sk-meta { width: 40%; height: 14px; border-radius: var(--radius-sm); }
    }

    .loading, .error, .empty { text-align: center; color: var(--color-text-muted); padding: var(--space-xl); }
    .error { color: #b91c1c; }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space-xl);
    }
    .card {
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--color-border-light);
      cursor: pointer;
      transition: transform 0.4s var(--ease-bounce), box-shadow 0.4s var(--ease-out), border-color 0.3s;
    }
    .card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-hover);
      border-color: var(--color-accent-soft);
    }
    .card-media {
      position: relative;
      overflow: hidden;
      aspect-ratio: 4 / 3;
    }
    .card-media img, .card-media video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s var(--ease-out);
    }
    .card:hover .card-media img,
    .card:hover .card-media video { transform: scale(1.06); }
    .card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 40%, rgba(42,31,31,0.55) 100%);
      opacity: 0;
      transition: opacity 0.35s var(--ease-out);
      display: flex;
      align-items: flex-end;
      padding: var(--space-lg);
    }
    .card:hover .card-overlay { opacity: 1; }
    .card-overlay span {
      color: #fff;
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.04em;
    }
    .video-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(255,255,255,0.9);
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
      pointer-events: none;
      z-index: 2;
    }
    .card-body {
      padding: var(--space-lg);
    }
    .card-body h2 {
      margin: 0 0 var(--space-xs);
      font-size: 1.0625rem;
      font-weight: 500;
    }
    .card-meta {
      font-size: 0.8125rem;
      color: var(--color-accent);
    }

    /* Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: var(--color-overlay);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-lg);
      animation: fadeIn 0.25s var(--ease-out);
    }
    .modal-box {
      background: var(--color-surface-elevated);
      border-radius: var(--radius-xl);
      max-width: 60rem;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-elevated);
      animation: scaleIn 0.35s var(--ease-bounce);
    }
    .modal-header {
      padding: var(--space-lg) var(--space-xl);
      border-bottom: 1px solid var(--color-border-light);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
    .modal-header h2 { margin: 0; font-size: 1.25rem; }
    .modal-close {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg-alt);
      border: 1px solid var(--color-border-light);
      border-radius: 50%;
      cursor: pointer;
      color: var(--color-text-muted);
      font-size: 1.25rem;
      line-height: 1;
      transition: background 0.2s, color 0.2s, transform 0.3s var(--ease-bounce);
      &:hover { background: var(--color-accent-subtle); color: var(--color-accent-dark); transform: scale(1.1); }
    }
    .modal-body {
      overflow-y: auto;
      padding: var(--space-xl);
    }
    .modal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: var(--space-lg);
    }
    .modal-item { border-radius: var(--radius-lg); overflow: hidden; }
    .modal-item .video-wrap {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
    }
    .modal-item .video-wrap video {
      width: 100%;
      height: auto;
      max-height: 280px;
      object-fit: cover;
      display: block;
      background: #000;
      cursor: pointer;
    }
    .modal-item .video-wrap .video-icon {
      transition: opacity 0.2s;
    }
    .modal-item .video-wrap.playing .video-icon { opacity: 0; }
    .modal-item img {
      width: 100%;
      height: auto;
      max-height: 280px;
      object-fit: cover;
      border-radius: var(--radius-lg);
      display: block;
    }
  `],
})
export class GalleryComponent {
  private http = inject(HttpClient);
  groups = signal<GalleryGroup[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  openGroup = signal<GalleryGroup | null>(null);
  private muteInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.http.get<GalleryGroup[]>(`${API_URL}/gallery/groups`).subscribe({
      next: (data) => {
        this.groups.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la galería.');
        this.loading.set(false);
      },
    });
  }

  openModal(group: GalleryGroup): void {
    this.openGroup.set(group);
    setTimeout(() => {
      this.forceMuteAllVideos();
      this.muteInterval = setInterval(() => this.forceMuteAllVideos(), 300);
    }, 100);
  }

  closeModal(): void {
    if (this.muteInterval) {
      clearInterval(this.muteInterval);
      this.muteInterval = null;
    }
    this.openGroup.set(null);
  }

  onBackdropClick(e: Event): void {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }

  muteVideo(e: Event): void {
    const video = e.target as HTMLVideoElement;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }

  toggleVideoPlay(e: Event): void {
    const video = e.target as HTMLVideoElement;
    if (!video) return;
    video.muted = true;
    video.volume = 0;
    video.paused ? video.play() : video.pause();
  }

  onVideoPlay(e: Event): void {
    const video = e.target as HTMLVideoElement;
    if (video) {
      video.muted = true;
      video.volume = 0;
      video.parentElement?.classList.add('playing');
    }
  }

  onVideoPause(e: Event): void {
    const video = e.target as HTMLVideoElement;
    video?.parentElement?.classList.remove('playing');
  }

  private forceMuteAllVideos(): void {
    const videos = document.querySelectorAll<HTMLVideoElement>('video');
    videos.forEach((v) => {
      v.muted = true;
      v.volume = 0;
    });
  }
}
