import {
  Component,
  input,
  signal,
  effect,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (images().length === 0) {
      <div class="carousel-empty">No hay imágenes para mostrar</div>
    } @else {
      <div class="carousel" (mouseenter)="pause()" (mouseleave)="resume()">
        <div class="carousel-track" [style.transform]="'translateX(-' + currentIndex() * 100 + '%)'">
          @for (img of images(); track img) {
            <div class="carousel-slide">
              <img [src]="img" alt="" loading="lazy" />
            </div>
          }
        </div>
        <button type="button" class="carousel-btn carousel-btn-prev" (click)="prev()" aria-label="Anterior">
          ‹
        </button>
        <button type="button" class="carousel-btn carousel-btn-next" (click)="next()" aria-label="Siguiente">
          ›
        </button>
        <div class="carousel-footer">
          <div class="carousel-dots">
            @for (img of images(); track img; let i = $index) {
              <button
                type="button"
                class="carousel-dot"
                [class.active]="currentIndex() === i"
                [attr.aria-label]="'Ir a imagen ' + (i + 1)"
                (click)="goTo(i)"
              ></button>
            }
          </div>
          <button
            type="button"
            class="carousel-play"
            [attr.aria-label]="isPaused() ? 'Reanudar' : 'Pausar'"
            (click)="togglePause()"
          >
            {{ isPaused() ? '▶' : '❚❚' }}
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .carousel-empty {
      padding: var(--space-2xl);
      min-height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--color-text-muted);
      background: var(--color-bg-alt);
      border: 2px dashed var(--color-border);
      border-radius: var(--radius-lg);
    }
    .carousel {
      position: relative;
      max-width: 56rem;
      margin: 0 auto;
      min-height: 280px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: var(--color-surface);
      box-shadow: var(--shadow-lg);
    }
    .carousel-track {
      display: flex;
      transition: transform 0.5s var(--ease-out);
    }
    .carousel-slide {
      flex: 0 0 100%;
      aspect-ratio: 16 / 10;
      min-height: 200px;
    }
    .carousel-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 3rem;
      height: 3rem;
      border: none;
      border-radius: 50%;
      background: rgba(255,255,255,0.9);
      color: var(--color-text);
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
      box-shadow: var(--shadow);
      transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
    }
    .carousel-btn:hover {
      background: #fff;
      box-shadow: var(--shadow-hover);
      transform: translateY(-50%) scale(1.05);
    }
    .carousel-btn-prev { left: var(--space-md); }
    .carousel-btn-next { right: var(--space-md); }
    .carousel-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: var(--space-md);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-md);
      background: linear-gradient(transparent, rgba(0,0,0,0.5));
    }
    .carousel-dots {
      display: flex;
      gap: var(--space-sm);
      align-items: center;
    }
    .carousel-dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      border: none;
      background: rgba(255,255,255,0.5);
      cursor: pointer;
      transition: background var(--transition), transform var(--transition);
    }
    .carousel-dot:hover { background: rgba(255,255,255,0.8); }
    .carousel-dot.active { background: #fff; transform: scale(1.2); }
    .carousel-play {
      width: 2.25rem;
      height: 2.25rem;
      border: none;
      border-radius: 50%;
      background: rgba(255,255,255,0.9);
      color: var(--color-text);
      font-size: 0.75rem;
      cursor: pointer;
      transition: background var(--transition);
    }
    .carousel-play:hover { background: #fff; }
  `],
})
export class ImageCarouselComponent implements OnDestroy {
  images = input.required<string[]>();
  autoplayInterval = input<number>(5000);

  currentIndex = signal(0);
  isPaused = signal(false);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect(() => {
      const imgs = this.images();
      if (imgs.length > 0) this.startAutoplay();
      return () => this.clearAutoplay();
    });
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
  }

  next(): void {
    const imgs = this.images();
    if (imgs.length === 0) return;
    this.currentIndex.set((this.currentIndex() + 1) % imgs.length);
    this.resetAutoplayAfterInteraction();
  }

  prev(): void {
    const imgs = this.images();
    if (imgs.length === 0) return;
    const idx = this.currentIndex();
    this.currentIndex.set(idx === 0 ? imgs.length - 1 : idx - 1);
    this.resetAutoplayAfterInteraction();
  }

  goTo(i: number): void {
    const imgs = this.images();
    if (i >= 0 && i < imgs.length) this.currentIndex.set(i);
    this.resetAutoplayAfterInteraction();
  }

  togglePause(): void {
    this.isPaused.update((p) => !p);
    if (this.isPaused()) this.clearAutoplay();
    else this.startAutoplay();
  }

  pause(): void {
    this.isPaused.set(true);
    this.clearAutoplay();
  }

  resume(): void {
    this.isPaused.set(false);
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (this.isPaused() || this.images().length <= 1) return;
    this.clearAutoplay();
    const ms = this.autoplayInterval();
    this.intervalId = setInterval(() => {
      this.next();
    }, ms);
  }

  private clearAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private resetAutoplayAfterInteraction(): void {
    if (!this.isPaused()) {
      this.startAutoplay();
    }
  }
}
