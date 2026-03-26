import {
  Component,
  input,
  signal,
  effect,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (images().length === 0) {
      <div class="carousel-empty">No hay imágenes para mostrar</div>
    } @else {
      <div class="carousel" (mouseenter)="pause()" (mouseleave)="resume()">
        <div class="carousel-viewport">
          @for (img of images(); track img; let i = $index) {
            <img
              class="carousel-img"
              [class.active]="currentIndex() === i"
              [class.prev]="prevIndex() === i"
              [src]="img"
              alt=""
              loading="lazy" />
          }
        </div>

        <button type="button" class="carousel-btn carousel-prev" (click)="prev()" aria-label="Anterior">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4l-6 6 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button type="button" class="carousel-btn carousel-next" (click)="next()" aria-label="Siguiente">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <div class="carousel-footer">
          <div class="carousel-dots">
            @for (img of images(); track img; let i = $index) {
              <button
                type="button"
                class="carousel-dot"
                [class.active]="currentIndex() === i"
                [attr.aria-label]="'Ir a imagen ' + (i + 1)"
                (click)="goTo(i)">
                @if (currentIndex() === i && !isPaused()) {
                  <span class="dot-progress" [style.animation-duration.ms]="autoplayInterval()"></span>
                }
              </button>
            }
          </div>
          <button
            type="button"
            class="carousel-play"
            [attr.aria-label]="isPaused() ? 'Reanudar' : 'Pausar'"
            (click)="togglePause()">
            @if (isPaused()) {
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.5v11l9-5.5z"/></svg>
            } @else {
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3.5" height="12" rx="1"/><rect x="8.5" y="1" width="3.5" height="12" rx="1"/></svg>
            }
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .carousel-empty {
      padding: var(--space-3xl);
      min-height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--color-text-muted);
      background: var(--color-surface);
      border: 1.5px dashed var(--color-border);
      border-radius: var(--radius-xl);
    }
    .carousel {
      position: relative;
      max-width: 56rem;
      margin: 0 auto;
      border-radius: var(--radius-xl);
      overflow: hidden;
      background: var(--color-dark);
      box-shadow: var(--shadow-lg);
    }
    .carousel-viewport {
      position: relative;
      aspect-ratio: 16 / 10;
      min-height: 200px;
    }
    .carousel-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.8s var(--ease-out), transform 4s linear;
      transform: scale(1);
    }
    .carousel-img.active {
      opacity: 1;
      z-index: 1;
      transform: scale(1.04);
    }
    .carousel-img.prev {
      opacity: 0;
      z-index: 0;
    }

    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 3;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(8px);
      color: var(--color-text);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      opacity: 0;
      transition: opacity 0.3s, background 0.2s, transform 0.3s var(--ease-bounce);
    }
    .carousel:hover .carousel-btn { opacity: 1; }
    .carousel-btn:hover {
      background: #fff;
      transform: translateY(-50%) scale(1.08);
      box-shadow: var(--shadow);
    }
    .carousel-prev { left: var(--space-md); }
    .carousel-next { right: var(--space-md); }

    .carousel-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 3;
      padding: var(--space-md) var(--space-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-md);
      background: linear-gradient(transparent, rgba(0,0,0,0.45));
    }
    .carousel-dots {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .carousel-dot {
      position: relative;
      width: 24px;
      height: 3px;
      border: none;
      border-radius: 2px;
      background: rgba(255,255,255,0.3);
      cursor: pointer;
      overflow: hidden;
      padding: 0;
      transition: background 0.3s;
    }
    .carousel-dot:hover { background: rgba(255,255,255,0.5); }
    .carousel-dot.active { background: rgba(255,255,255,0.3); }
    .dot-progress {
      position: absolute;
      inset: 0;
      background: #fff;
      border-radius: 2px;
      animation: dotFill linear forwards;
      transform-origin: left;
    }
    @keyframes dotFill {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }

    .carousel-play {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(4px);
      color: rgba(255,255,255,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
      &:hover { background: rgba(255,255,255,0.25); }
    }
  `],
})
export class ImageCarouselComponent implements OnDestroy {
  images = input.required<string[]>();
  autoplayInterval = input<number>(5000);

  currentIndex = signal(0);
  prevIndex = signal(-1);
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
    this.prevIndex.set(this.currentIndex());
    this.currentIndex.set((this.currentIndex() + 1) % imgs.length);
    this.resetAutoplayAfterInteraction();
  }

  prev(): void {
    const imgs = this.images();
    if (imgs.length === 0) return;
    this.prevIndex.set(this.currentIndex());
    const idx = this.currentIndex();
    this.currentIndex.set(idx === 0 ? imgs.length - 1 : idx - 1);
    this.resetAutoplayAfterInteraction();
  }

  goTo(i: number): void {
    const imgs = this.images();
    if (i >= 0 && i < imgs.length) {
      this.prevIndex.set(this.currentIndex());
      this.currentIndex.set(i);
    }
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
