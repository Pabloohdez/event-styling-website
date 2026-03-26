import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { ImageCarouselComponent } from '../../shared/image-carousel.component';

const API_URL = '/api';

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, ScrollRevealDirective, ImageCarouselComponent],
  template: `
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <div class="hero-orb hero-orb-1"></div>
        <div class="hero-orb hero-orb-2"></div>
      </div>
      <div class="hero-grid">
        <div class="hero-content">
          <span class="hero-badge">
            <span class="hero-badge-dot"></span>
            Tenerife
          </span>
          <h1 class="hero-title">Diseño de eventos<br>que cuenta <em>tu historia</em></h1>
          <div class="hero-line" aria-hidden="true"></div>
          <p class="hero-lead">Decoración personalizada para baby showers, bodas, comuniones y celebraciones. Profesional con desplazamiento por toda la isla.</p>
          <div class="hero-cta">
            <a routerLink="/galeria" class="btn btn-primary">
              <span>Ver galería</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a routerLink="/contacto" class="btn btn-outline">Solicitar presupuesto</a>
          </div>
        </div>
        <div class="hero-visual">
          @if (heroImages().length > 0) {
            <div class="hero-collage">
              <div class="collage-card c1">
                <img [src]="heroImages()[0]" alt="" loading="eager" />
              </div>
              @if (heroImages().length > 1) {
                <div class="collage-card c2">
                  <img [src]="heroImages()[1]" alt="" loading="lazy" />
                </div>
              }
              @if (heroImages().length > 2) {
                <div class="collage-card c3">
                  <img [src]="heroImages()[2]" alt="" loading="lazy" />
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Carousel -->
    <section class="carousel-section">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <div class="section-line"></div>
          <h2>Galería</h2>
          <div class="section-line"></div>
        </div>
        <p class="section-subtitle" appScrollReveal>Algunos de nuestros trabajos más recientes</p>
        <app-image-carousel [images]="carouselImages()" [autoplayInterval]="5000" />
      </div>
    </section>

    <!-- Why Us -->
    <section class="why-us">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <div class="section-line"></div>
          <h2>Por qué elegirnos</h2>
          <div class="section-line"></div>
        </div>
        <p class="section-subtitle" appScrollReveal>Cada evento merece ser único e irrepetible</p>
        <div class="why-grid">
          <div class="why-card" appScrollReveal>
            <span class="why-number">01</span>
            <div class="why-icon-wrap"><span class="why-icon">✦</span></div>
            <h3>Personalización total</h3>
            <p>Cada detalle pensado para tu evento y tu presupuesto. Nada genérico, todo a medida.</p>
          </div>
          <div class="why-card" appScrollReveal>
            <span class="why-number">02</span>
            <div class="why-icon-wrap"><span class="why-icon">✦</span></div>
            <h3>Desplazamiento</h3>
            <p>Nos desplazamos por toda Tenerife y podemos valorar otras islas del archipiélago.</p>
          </div>
          <div class="why-card" appScrollReveal>
            <span class="why-number">03</span>
            <div class="why-icon-wrap"><span class="why-icon">✦</span></div>
            <h3>Tarifas competitivas</h3>
            <p>Calidad profesional con precios transparentes que se adaptan a lo que necesitas.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Preview -->
    <section class="preview" appScrollReveal>
      <div class="container">
        <h2>Últimos trabajos</h2>
        <p class="preview-text">Baby showers, primeros cumpleaños, eventos corporativos y celebraciones íntimas.</p>
        <a routerLink="/galeria" class="link-arrow">
          Ver toda la galería
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-strip">
      <div class="cta-inner">
        <p class="cta-label">¿Tienes un evento?</p>
        <p class="cta-title">Hagamos realidad tu evento soñado</p>
        <a routerLink="/contacto" class="btn btn-light">Solicitar presupuesto</a>
      </div>
    </section>
  `,
  styles: [`
    /* ── Hero ── */
    .hero {
      position: relative;
      padding: var(--space-4xl) var(--space-xl) var(--space-3xl);
      overflow: hidden;
      background: var(--color-bg);
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .hero-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
    }
    .hero-orb-1 {
      width: 500px;
      height: 500px;
      top: -10%;
      right: -5%;
      background: radial-gradient(circle, rgba(184,132,138,0.18), transparent 70%);
    }
    .hero-orb-2 {
      width: 400px;
      height: 400px;
      bottom: -20%;
      left: -10%;
      background: radial-gradient(circle, rgba(196,150,122,0.12), transparent 70%);
    }
    .hero-grid {
      max-width: 72rem;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: var(--space-3xl);
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .hero-content {
      animation: fadeInUp 0.9s var(--ease-out) both;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      padding: 6px var(--space-md) 6px 10px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-accent-dark);
      border: 1px solid var(--color-accent-soft);
      border-radius: var(--radius-pill);
      margin-bottom: var(--space-xl);
      animation: fadeInUp 0.8s var(--ease-out) 0.1s both;
    }
    .hero-badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-accent);
      animation: float 3s ease-in-out infinite;
    }
    .hero-title {
      margin: 0 0 var(--space-lg);
      font-size: clamp(2.5rem, 5.5vw, 3.75rem);
      font-weight: 500;
      line-height: 1.08;
      letter-spacing: -0.02em;
      color: var(--color-text);
      animation: fadeInUp 0.9s var(--ease-out) 0.15s both;
      em {
        font-style: italic;
        color: var(--color-accent-dark);
      }
    }
    .hero-line {
      width: 4.5rem;
      height: 2px;
      background: linear-gradient(90deg, var(--color-accent), var(--color-accent-gold));
      border-radius: 2px;
      margin-bottom: var(--space-lg);
      animation: lineGrow 0.7s var(--ease-out) 0.4s both;
      transform-origin: left;
    }
    .hero-lead {
      font-size: 1.0625rem;
      line-height: 1.7;
      color: var(--color-text-muted);
      max-width: 32rem;
      margin: 0 0 var(--space-2xl);
      animation: fadeInUp 0.9s var(--ease-out) 0.3s both;
    }
    .hero-cta {
      display: flex;
      gap: var(--space-md);
      flex-wrap: wrap;
      animation: fadeInUp 0.9s var(--ease-out) 0.45s both;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      padding: 0.875rem 1.75rem;
      border-radius: var(--radius);
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      cursor: pointer;
      border: none;
      transition: transform 0.35s var(--ease-bounce), background 0.35s var(--ease-out), color 0.3s, box-shadow 0.35s var(--ease-out);
    }
    .btn:hover { transform: translateY(-3px); }
    .btn:active { transform: translateY(-1px); }
    .btn-primary {
      background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%);
      color: #fff;
      box-shadow: var(--shadow), 0 4px 16px rgba(184, 132, 138, 0.25);
      svg { transition: transform 0.3s var(--ease-out); }
      &:hover {
        box-shadow: var(--shadow-hover), 0 8px 24px rgba(184, 132, 138, 0.3);
        color: #fff;
        svg { transform: translateX(3px); }
      }
    }
    .btn-outline {
      background: transparent;
      color: var(--color-text);
      border: 1.5px solid var(--color-border);
      &:hover {
        border-color: var(--color-accent);
        color: var(--color-accent-dark);
        background: var(--color-accent-subtle);
      }
    }
    .btn-light {
      background: var(--color-surface-elevated);
      color: var(--color-accent-dark);
      font-weight: 600;
      box-shadow: var(--shadow);
      &:hover {
        box-shadow: var(--shadow-hover);
        color: var(--color-accent-dark);
      }
    }

    /* Hero Visual */
    .hero-visual {
      position: relative;
      min-height: 360px;
      animation: scaleIn 1s var(--ease-out) 0.3s both;
    }
    .hero-collage {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 360px;
    }
    .collage-card {
      position: absolute;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out);
      &:hover {
        transform: scale(1.03) !important;
        box-shadow: var(--shadow-elevated);
        z-index: 3;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
    .collage-card.c1 {
      width: 65%;
      aspect-ratio: 3 / 4;
      top: 0;
      right: 5%;
      z-index: 2;
      animation: float 8s var(--ease-out) infinite;
    }
    .collage-card.c2 {
      width: 50%;
      aspect-ratio: 4 / 5;
      bottom: 0;
      left: 0;
      z-index: 1;
      animation: float 8s var(--ease-out) 2s infinite;
      transform: rotate(-4deg);
    }
    .collage-card.c3 {
      width: 35%;
      aspect-ratio: 1;
      top: 10%;
      left: 12%;
      z-index: 0;
      opacity: 0.85;
      animation: float 8s var(--ease-out) 4s infinite;
      transform: rotate(3deg);
    }

    /* ── Section common ── */
    .container { max-width: 68rem; margin: 0 auto; padding: 0 var(--space-xl); }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-lg);
      margin-bottom: var(--space-md);
      h2 { margin: 0; white-space: nowrap; }
    }
    .section-line {
      flex: 1;
      max-width: 6rem;
      height: 1px;
      background: var(--color-accent-soft);
    }
    .section-subtitle {
      text-align: center;
      color: var(--color-text-muted);
      font-size: 1.0625rem;
      margin: 0 0 var(--space-2xl);
    }

    /* ── Carousel Section ── */
    .carousel-section {
      padding: var(--space-4xl) 0;
      background: var(--color-bg-alt);
      position: relative;
      overflow: hidden;
    }
    .carousel-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 15% 30%, rgba(184,132,138,0.08), transparent 50%),
        radial-gradient(ellipse at 85% 70%, rgba(196,150,122,0.08), transparent 50%);
      pointer-events: none;
    }

    /* ── Why Us ── */
    .why-us {
      padding: var(--space-4xl) 0;
      background: var(--color-bg);
    }
    .why-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-xl);
    }
    .why-card {
      position: relative;
      padding: var(--space-2xl) var(--space-xl);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border-light);
      border-left: 3px solid var(--color-accent);
      transition: transform 0.4s var(--ease-bounce), box-shadow 0.4s var(--ease-out), background 0.3s;
      &:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-hover);
        background: var(--color-surface-elevated);
      }
    }
    .why-number {
      position: absolute;
      top: var(--space-lg);
      right: var(--space-lg);
      font-family: var(--font-display);
      font-size: 2.5rem;
      font-weight: 400;
      color: var(--color-border);
      line-height: 1;
      letter-spacing: -0.02em;
      transition: color 0.3s;
    }
    .why-card:hover .why-number { color: var(--color-accent-soft); }
    .why-icon-wrap {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-accent-subtle);
      border-radius: 50%;
      margin-bottom: var(--space-lg);
      transition: background 0.3s, transform 0.4s var(--ease-bounce);
    }
    .why-card:hover .why-icon-wrap { background: var(--color-accent); transform: scale(1.1); }
    .why-icon {
      font-size: 1.1rem;
      color: var(--color-accent);
      transition: color 0.3s;
    }
    .why-card:hover .why-icon { color: #fff; }
    .why-card h3 {
      font-size: 1.125rem;
      margin: 0 0 var(--space-sm);
    }
    .why-card p {
      font-size: 0.9375rem;
      color: var(--color-text-muted);
      margin: 0;
      line-height: 1.65;
    }

    /* ── Preview ── */
    .preview {
      padding: var(--space-3xl) 0;
      background: linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%);
    }
    .preview h2 { margin-bottom: var(--space-sm); }
    .preview-text { color: var(--color-text-muted); margin-bottom: var(--space-md); }
    .link-arrow {
      font-weight: 600;
      font-size: 0.9375rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5em;
      color: var(--color-accent-dark);
      svg { transition: transform 0.35s var(--ease-out); }
      &:hover {
        color: var(--color-accent);
        svg { transform: translateX(5px); }
      }
    }

    /* ── CTA Strip ── */
    .cta-strip {
      padding: var(--space-4xl) var(--space-xl);
      background: var(--color-dark);
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .cta-strip::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 30% 50%, rgba(184,132,138,0.12), transparent 60%),
        radial-gradient(ellipse at 70% 50%, rgba(196,150,122,0.08), transparent 60%);
      pointer-events: none;
    }
    .cta-inner {
      position: relative;
      z-index: 1;
      max-width: 36rem;
      margin: 0 auto;
    }
    .cta-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--color-accent-soft);
      margin: 0 0 var(--space-md);
    }
    .cta-title {
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 500;
      color: #fff;
      margin: 0 0 var(--space-2xl);
      line-height: 1.2;
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .hero-grid { grid-template-columns: 1fr; text-align: center; }
      .hero-content { order: 1; }
      .hero-visual { order: 0; min-height: 260px; }
      .hero-cta { justify-content: center; }
      .hero-lead { margin-left: auto; margin-right: auto; }
      .hero-title { font-size: clamp(2rem, 6vw, 2.75rem); }
      .collage-card.c3 { display: none; }
      .why-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .hero { padding: var(--space-2xl) var(--space-md) var(--space-xl); }
      .hero-visual { min-height: 220px; }
      .collage-card.c2 { display: none; }
      .collage-card.c1 { width: 80%; right: 10%; }
    }
  `],
})
export class HomeComponent implements OnInit {
  private http = inject(HttpClient);
  carouselImages = signal<string[]>([]);
  heroImages = computed(() => this.carouselImages().slice(0, 3));

  ngOnInit(): void {
    this.http.get<{ imageUrl: string }[]>(`${API_URL}/gallery`).subscribe({
      next: (items) => {
        const urls = items.map((i) => i.imageUrl).filter(Boolean);
        this.carouselImages.set(shuffle(urls));
      },
    });
  }
}
