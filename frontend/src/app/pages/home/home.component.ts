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
    <section class="hero">
      <div class="hero-content">
        <span class="hero-badge">Tenerife</span>
        <h1>Diseño de eventos que cuenta tu historia</h1>
        <span class="hero-line" aria-hidden="true"></span>
        <p class="lead">Decoración personalizada en Tenerife. Baby showers, bodas, comuniones y más. Profesional con desplazamiento y tarifas competitivas.</p>
        <div class="cta">
          <a routerLink="/galeria" class="btn btn-primary">Ver galería</a>
          <a routerLink="/contacto" class="btn btn-secondary">Solicitar presupuesto</a>
        </div>
      </div>
      @if (heroImages().length > 0) {
        <div class="hero-collage" aria-hidden="true">
          <div class="polaroid p1">
            <img [src]="heroImages()[0]" alt="" loading="eager" />
          </div>
          @if (heroImages().length > 1) {
            <div class="polaroid p2">
              <img [src]="heroImages()[1]" alt="" loading="lazy" />
            </div>
          }
          @if (heroImages().length > 2) {
            <div class="polaroid p3">
              <img [src]="heroImages()[2]" alt="" loading="lazy" />
            </div>
          }
        </div>
      }
    </section>
    <section class="carousel-section">
      <div class="container">
        <h2 class="carousel-title">Galería</h2>
        <p class="carousel-lead">Algunos de nuestros trabajos</p>
        <app-image-carousel [images]="carouselImages()" [autoplayInterval]="5000" />
      </div>
    </section>
    <section class="intro">
      <div class="container" appScrollReveal>
        <h2>Por qué elegirnos</h2>
        <p class="intro-text">Somos una diseñadora de eventos con base en Tenerife, especializada en crear ambientes únicos. Trabajamos contigo de principio a fin para que tu evento refleje tu estilo, con precios claros y sin sorpresas.</p>
        <div class="highlights">
          <div class="card">
            <span class="card-icon">✦</span>
            <h3>Personalización total</h3>
            <p>Cada detalle pensado para tu evento y tu presupuesto.</p>
          </div>
          <div class="card">
            <span class="card-icon">✦</span>
            <h3>Desplazamiento</h3>
            <p>Nos desplazamos por Tenerife y podemos valorar otras islas.</p>
          </div>
          <div class="card">
            <span class="card-icon">✦</span>
            <h3>Tarifas competitivas</h3>
            <p>Calidad profesional con precios que se adaptan a ti.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="preview" appScrollReveal>
      <div class="container">
        <h2>Últimos trabajos</h2>
        <p class="muted">Baby showers, primeros cumpleaños, eventos corporativos y celebraciones íntimas.</p>
        <a routerLink="/galeria" class="link-arrow">Ver toda la galería →</a>
      </div>
    </section>
    <section class="cta-strip">
      <div class="cta-strip-inner">
        <p class="cta-strip-text">¿Lista para tu evento soñado?</p>
        <a routerLink="/contacto" class="btn btn-primary btn-invert">Solicitar presupuesto</a>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: var(--space-3xl) var(--space-xl);
      background: linear-gradient(145deg, var(--color-bg-alt) 0%, var(--color-bg) 40%, var(--color-surface) 100%);
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23A47E82' fill-opacity='0.04'/%3E%3C/g%3E%3C/svg%3E"),
        linear-gradient(145deg, var(--color-bg-alt) 0%, var(--color-bg) 40%, var(--color-surface) 100%);
      text-align: center;
      position: relative;
      overflow: hidden;
      transition: background var(--transition-slow);
    }
    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -15%;
      width: 70%;
      height: 160%;
      background: radial-gradient(ellipse, rgba(164,126,130,0.14) 0%, rgba(230,206,206,0.08) 40%, transparent 70%);
      pointer-events: none;
    }
    .hero::after {
      content: '';
      position: absolute;
      bottom: -30%;
      left: -10%;
      width: 50%;
      height: 80%;
      background: radial-gradient(ellipse, rgba(230,206,206,0.12) 0%, transparent 60%);
      pointer-events: none;
    }
    .hero-content { max-width: 42rem; margin: 0 auto; position: relative; z-index: 1; }
    .hero { isolation: isolate; }
    .hero-collage {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }
    .polaroid {
      position: absolute;
      width: clamp(150px, 22vw, 260px);
      aspect-ratio: 4 / 5;
      border-radius: 16px;
      background: rgba(240,231,226,0.85);
      box-shadow: 0 18px 44px rgba(62,51,51,0.18);
      border: 1px solid rgba(164,126,130,0.22);
      backdrop-filter: blur(10px);
      overflow: hidden;
      transform: translateZ(0);
      animation: floaty 8s var(--ease-out) infinite;
    }
    .polaroid::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255,255,255,0.16), rgba(0,0,0,0.10));
      opacity: 0.55;
      pointer-events: none;
      mix-blend-mode: soft-light;
    }
    .polaroid img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: saturate(1.05) contrast(1.02);
    }
    .polaroid.p1 {
      right: clamp(1rem, 5vw, 4rem);
      top: clamp(1.25rem, 6vw, 5rem);
      transform: rotate(6deg);
      animation-delay: 0.2s;
    }
    .polaroid.p2 {
      left: clamp(0.75rem, 3vw, 3rem);
      bottom: clamp(0.75rem, 4vw, 3.5rem);
      width: clamp(140px, 19vw, 230px);
      transform: rotate(-8deg);
      animation-delay: 1s;
      opacity: 0.95;
    }
    .polaroid.p3 {
      right: clamp(5rem, 18vw, 18rem);
      bottom: clamp(0.25rem, 2vw, 2rem);
      width: clamp(130px, 18vw, 210px);
      transform: rotate(12deg);
      animation-delay: 2.2s;
      opacity: 0.9;
    }
    @keyframes floaty {
      0%, 100% { translate: 0 0; }
      50% { translate: 0 -10px; }
    }
    .hero-badge {
      display: inline-block;
      padding: var(--space-xs) var(--space-md);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-accent);
      border: 1px solid var(--color-accent-soft);
      border-radius: 2rem;
      margin-bottom: var(--space-lg);
      animation: fadeInUp 0.9s var(--ease-out) both;
    }
    .hero h1 {
      margin-bottom: var(--space-md);
      color: var(--color-text);
      letter-spacing: 0.02em;
      animation: fadeInUp 0.9s var(--ease-out) both;
      transition: color var(--transition);
    }
    .hero-line {
      display: block;
      width: 4rem;
      height: 3px;
      margin: 0 auto var(--space-lg);
      background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
      border-radius: 2px;
      animation: fadeInUp 0.9s var(--ease-out) 0.1s both;
    }
    .lead {
      font-size: 1.125rem;
      color: var(--color-text-muted);
      margin-bottom: var(--space-2xl);
      animation: fadeInUp 0.9s var(--ease-out) 0.2s both;
    }
    .cta { display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap; animation: fadeInUp 0.9s var(--ease-out) 0.4s both; }
    .btn {
      display: inline-block;
      padding: var(--space-md) var(--space-xl);
      border-radius: var(--radius);
      font-weight: 500;
      transition: transform 0.35s var(--ease-bounce), background var(--transition), color var(--transition), border-color var(--transition), box-shadow var(--transition);
    }
    .btn:hover { transform: translateY(-4px) scale(1.02); }
    .btn:active { transform: translateY(-2px); }
    .btn-primary {
      background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%);
      color: #fff;
      box-shadow: var(--shadow);
      &:hover { background: linear-gradient(135deg, var(--color-accent-hover) 0%, var(--color-accent) 100%); box-shadow: var(--shadow-hover); }
    }
    .btn-secondary {
      background: transparent;
      color: var(--color-text);
      border: 2px solid var(--color-border);
      &:hover { border-color: var(--color-accent); color: var(--color-accent); background: var(--color-accent-subtle); }
    }
    .btn-primary.btn-invert {
      background: var(--color-surface);
      color: var(--color-accent);
      border: 2px solid var(--color-surface);
      &:hover { background: #fff; color: var(--color-accent-dark); box-shadow: var(--shadow-hover); }
    }
    .intro { padding: var(--space-3xl) var(--space-xl); }
    .intro { position: relative; overflow: hidden; }
    .intro::before {
      content: '';
      position: absolute;
      top: -2rem;
      left: -2rem;
      width: 16rem;
      height: 16rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cg fill='none' stroke='%23A47E82' stroke-opacity='.22' stroke-width='2'%3E%3Cpath d='M70 154c18-7 35-22 44-40 10-22 8-43-7-56-18-16-48-10-64 16-20 32-11 66 27 80Z'/%3E%3Cpath d='M160 168c12-18 18-41 13-63-6-26-26-41-49-38-26 3-42 29-34 55 9 30 39 52 70 46Z'/%3E%3Cpath d='M120 208c10-10 17-24 18-39 1-18-10-31-26-33-18-3-34 13-34 33 0 22 18 42 42 39Z'/%3E%3C/g%3E%3Cg fill='%23E6CECE' fill-opacity='.35'%3E%3Ccircle cx='206' cy='66' r='4'/%3E%3Ccircle cx='216' cy='86' r='3'/%3E%3Ccircle cx='192' cy='86' r='2.5'/%3E%3C/g%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: contain;
      filter: blur(0.2px);
      pointer-events: none;
    }
    .intro::after {
      content: '';
      position: absolute;
      bottom: -3rem;
      right: -3rem;
      width: 18rem;
      height: 18rem;
      background-image: radial-gradient(circle at 30% 30%, rgba(164,126,130,0.14), transparent 60%), radial-gradient(circle at 70% 70%, rgba(230,206,206,0.22), transparent 58%);
      pointer-events: none;
    }
    .container { max-width: 64rem; margin: 0 auto; }
    .intro h2 {
      text-align: center;
      margin-bottom: var(--space-lg);
      color: var(--color-text);
      transition: color var(--transition);
    }
    .intro-text {
      text-align: center;
      max-width: 36rem;
      margin: 0 auto var(--space-2xl);
      color: var(--color-text-muted);
    }
    .highlights {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-xl);
    }
    .card {
      padding: var(--space-xl);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      border: 2px solid var(--color-border);
      border-top: 4px solid var(--color-accent);
      text-align: center;
      transition: transform 0.4s var(--ease-bounce), box-shadow var(--transition-slow), border-color var(--transition), background var(--transition);
    }
    .card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: var(--shadow-hover);
      border-color: var(--color-accent-soft);
      border-top-color: var(--color-accent);
      background: var(--color-highlight);
    }
    .card-icon {
      font-size: 1.75rem;
      color: var(--color-accent);
      display: block;
      margin-bottom: var(--space-sm);
      transition: transform 0.4s var(--ease-bounce), color var(--transition);
    }
    .card:hover .card-icon { transform: scale(1.25) rotate(5deg); color: var(--color-accent-gold); }
    .card h3 { margin-bottom: var(--space-sm); font-size: 1.125rem; }
    .card p { font-size: 0.9375rem; color: var(--color-text-muted); margin: 0; }
    .preview {
      padding: var(--space-2xl) var(--space-xl);
      background: linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%);
      transition: background var(--transition-slow);
    }
    .preview { position: relative; overflow: hidden; }
    .preview::before {
      content: '';
      position: absolute;
      top: -3.5rem;
      right: -3.5rem;
      width: 22rem;
      height: 22rem;
      background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='360' viewBox='0 0 360 360'%3E%3Cg fill='none' stroke='%235E3F44' stroke-opacity='.16' stroke-width='2'%3E%3Cpath d='M248 92c-34 6-63 30-74 62-12 35-1 71 31 88 35 18 79-4 90-48 10-39-11-83-47-102Z'/%3E%3Cpath d='M142 116c-22-8-47 2-57 24-11 25 2 55 30 63 27 8 54-12 54-40 0-20-11-39-27-47Z'/%3E%3Cpath d='M180 258c-18-5-37 6-42 26-6 23 9 44 31 44 22 0 38-22 31-44-4-14-12-23-20-26Z'/%3E%3C/g%3E%3C/svg%3E\");
      background-repeat: no-repeat;
      background-size: contain;
      pointer-events: none;
    }
    .preview h2 { margin-bottom: var(--space-sm); }
    .preview .muted { color: var(--color-text-muted); margin-bottom: var(--space-md); }
    .link-arrow {
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 0.35em;
      transition: gap 0.35s var(--ease-bounce), color var(--transition), transform var(--transition);
      &:hover { gap: 0.75em; color: var(--color-accent); transform: translateX(4px); }
    }
    .cta-strip {
      padding: var(--space-2xl) var(--space-xl);
      background: linear-gradient(90deg, var(--color-bg-alt) 0%, var(--color-accent-soft) 50%, var(--color-bg-alt) 100%);
      text-align: center;
    }
    .cta-strip { position: relative; overflow: hidden; }
    .cta-strip::before,
    .cta-strip::after {
      content: '';
      position: absolute;
      width: 12rem;
      height: 12rem;
      background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cg fill='none' stroke='%23A47E82' stroke-opacity='.26' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M38 150c26-18 42-48 44-78'/%3E%3Cpath d='M54 158c34-10 68-40 84-74'/%3E%3Cpath d='M86 162c30-2 58-22 76-50'/%3E%3Cpath d='M60 98c12 2 24-6 26-18'/%3E%3Cpath d='M112 122c12 2 24-6 26-18'/%3E%3Cpath d='M146 142c12 2 24-6 26-18'/%3E%3C/g%3E%3Cg fill='%23F0E7E2' fill-opacity='.55'%3E%3Ccircle cx='176' cy='62' r='6'/%3E%3Ccircle cx='160' cy='78' r='4'/%3E%3Ccircle cx='190' cy='86' r='3'/%3E%3C/g%3E%3C/svg%3E\");
      background-repeat: no-repeat;
      background-size: contain;
      pointer-events: none;
      opacity: 0.9;
    }
    .cta-strip::before { left: -2.5rem; bottom: -2.5rem; transform: rotate(-8deg); }
    .cta-strip::after { right: -2.5rem; top: -2.5rem; transform: rotate(14deg); }
    .cta-strip-inner {
      max-width: 40rem;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: var(--space-lg);
    }
    .cta-strip-text {
      font-family: var(--font-display);
      font-size: clamp(1.25rem, 3vw, 1.5rem);
      font-weight: 500;
      color: var(--color-text);
      margin: 0;
    }
    .cta-strip .btn { flex-shrink: 0; }
  .carousel-section {
      padding: var(--space-2xl) var(--space-xl);
      background: var(--color-bg-alt);
      min-height: 320px;
    }
    .carousel-section { position: relative; overflow: hidden; }
    .carousel-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(circle at 18% 30%, rgba(164,126,130,0.10), transparent 40%),
        radial-gradient(circle at 82% 70%, rgba(230,206,206,0.28), transparent 45%);
      pointer-events: none;
    }
    .carousel-section::after {
      content: '';
      position: absolute;
      top: -2.25rem;
      left: -2.25rem;
      width: 14rem;
      height: 14rem;
      background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Cg fill='none' stroke='%23A47E82' stroke-opacity='.22' stroke-width='2'%3E%3Cpath d='M62 150c10-30 36-54 68-62 35-9 68 7 78 38 11 33-12 70-51 74-43 5-86-24-95-50Z'/%3E%3Cpath d='M86 94c-10-18-8-40 6-52 16-14 41-6 50 12 10 20 1 46-21 52-14 4-27 0-35-12Z'/%3E%3C/g%3E%3C/svg%3E\");
      background-repeat: no-repeat;
      background-size: contain;
      pointer-events: none;
    }
    @media (max-width: 900px) {
      .polaroid.p3 { display: none; }
    }
    @media (max-width: 700px) {
      .hero-collage { display: none; }
    }
    .carousel-section .container { max-width: 56rem; margin: 0 auto; }
    .carousel-title { text-align: center; margin-bottom: var(--space-xs); }
    .carousel-lead { text-align: center; color: var(--color-text-muted); margin-bottom: var(--space-lg); }
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
