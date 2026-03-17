import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  templateUrl: './gallery.component.html',
  styles: [`
    .page-hero {
      padding: var(--space-2xl) var(--space-xl);
      text-align: center;
      background: linear-gradient(145deg, var(--color-bg-alt) 0%, var(--color-bg) 100%);
    }
    .page-hero h1 { margin-bottom: var(--space-sm); }
    .lead { color: var(--color-text-muted); margin: 0; }
    .content { padding: var(--space-2xl) var(--space-xl); }
    .container { max-width: 64rem; margin: 0 auto; }
    .loading, .error, .muted { text-align: center; color: var(--color-text-muted); }
    .error { color: #b91c1c; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-xl); }
    .card {
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 2px solid var(--color-border);
      cursor: pointer;
      transition: box-shadow var(--transition-slow), transform 0.4s var(--ease-bounce), border-color var(--transition);
    }
    .card:hover {
      box-shadow: var(--shadow-hover);
      transform: translateY(-10px) scale(1.03);
      border-color: var(--color-accent-soft);
    }
    .video-wrap { position: relative; display: block; }
    .video-wrap .card-cover { width: 100%; height: 220px; object-fit: cover; display: block; }
    .video-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(255,255,255,0.9);
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
      pointer-events: none;
    }
    .video-wrap.playing .video-icon { opacity: 0; transition: opacity 0.2s; }
    .card-cover {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
    }
    .card-body { padding: var(--space-lg); }
    .card-body h2 { margin: 0 0 var(--space-xs); font-size: 1.125rem; }
    .card-meta { font-size: 0.8125rem; color: var(--color-accent); transition: color var(--transition); }
    /* Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-lg);
      box-sizing: border-box;
    }
    .modal-box {
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      max-width: 56rem;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 24px 48px rgba(0,0,0,0.2), 0 0 0 1px var(--color-border);
      animation: subtleScale 0.35s var(--ease-bounce);
    }
    .modal-header {
      padding: var(--space-lg) var(--space-xl);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
    .modal-header h2 { margin: 0; font-size: 1.25rem; }
    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
      color: var(--color-text-muted);
      padding: 0.25rem;
    }
    .modal-close { transition: color var(--transition), transform var(--transition); }
    .modal-close:hover { color: var(--color-accent); transform: scale(1.15); }
    .modal-body {
      overflow-y: auto;
      padding: var(--space-xl);
    }
    .modal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: var(--space-lg);
    }
    .modal-item .video-wrap { position: relative; border-radius: var(--radius-md); overflow: hidden; }
    .modal-item .video-wrap video {
      width: 100%;
      height: auto;
      max-height: 280px;
      object-fit: cover;
      display: block;
      background: #000;
      cursor: pointer;
    }
    .modal-item .video-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(255,255,255,0.95);
      filter: drop-shadow(0 2px 10px rgba(0,0,0,0.6));
      pointer-events: none;
      transition: opacity 0.2s;
    }
    .modal-item .video-wrap.playing .video-icon { opacity: 0; }
    .modal-item img {
      width: 100%;
      height: auto;
      max-height: 280px;
      object-fit: cover;
      border-radius: var(--radius-md);
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

  /** Fuerza mute y volumen 0 en el vídeo. */
  muteVideo(e: Event): void {
    const video = e.target as HTMLVideoElement;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }

  /** Play/pause al hacer clic en el vídeo (sin controles nativos). */
  toggleVideoPlay(e: Event): void {
    const video = e.target as HTMLVideoElement;
    if (!video) return;
    video.muted = true;
    video.volume = 0;
    video.paused ? video.play() : video.pause();
  }

  /** Oculta el icono de pausa cuando el vídeo se reproduce y fuerza mute. */
  onVideoPlay(e: Event): void {
    const video = e.target as HTMLVideoElement;
    if (video) {
      video.muted = true;
      video.volume = 0;
      video.parentElement?.classList.add('playing');
    }
  }

  /** Muestra el icono de pausa cuando el vídeo se pausa. */
  onVideoPause(e: Event): void {
    const video = e.target as HTMLVideoElement;
    video?.parentElement?.classList.remove('playing');
  }

  /** Mutea todos los vídeos (modal + tarjetas) y fuerza volumen 0. */
  private forceMuteAllVideos(): void {
    const videos = document.querySelectorAll<HTMLVideoElement>('video');
    videos.forEach((v) => {
      v.muted = true;
      v.volume = 0;
    });
  }
}
