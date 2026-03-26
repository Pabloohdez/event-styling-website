import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

const API_URL = '/api';

interface PricingPackage {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  features: string[];
  highlighted: boolean;
  order: number;
}

@Component({
  selector: 'app-pricing',
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './pricing.component.html',
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
      padding: var(--space-2xl);
      border-radius: var(--radius-lg);
      .sk-title { width: 50%; height: 20px; margin-bottom: var(--space-md); border-radius: var(--radius-sm); }
      .sk-price { width: 35%; height: 32px; margin-bottom: var(--space-xl); border-radius: var(--radius-sm); }
      .sk-feat { width: 90%; height: 14px; margin-bottom: var(--space-sm); border-radius: var(--radius-sm); }
      .sk-btn { width: 100%; height: 44px; border-radius: var(--radius); margin-top: var(--space-lg); }
    }

    .error { text-align: center; color: #b91c1c; padding: var(--space-xl); }
    .empty { text-align: center; color: var(--color-text-muted); padding: var(--space-xl); }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space-xl);
      align-items: start;
    }
    .card {
      position: relative;
      padding: var(--space-2xl);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border-light);
      display: flex;
      flex-direction: column;
      transition: transform 0.4s var(--ease-bounce), box-shadow 0.4s var(--ease-out), border-color 0.3s;
    }
    .card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-hover);
    }
    .card.highlighted {
      border-color: var(--color-accent);
      box-shadow: var(--shadow-lg), 0 0 0 1px var(--color-accent-soft);
    }
    .card.highlighted:hover {
      box-shadow: var(--shadow-hover), 0 0 0 1px var(--color-accent);
    }
    .badge-popular {
      position: absolute;
      top: calc(var(--space-lg) * -1 + 4px);
      right: var(--space-lg);
      padding: 4px 14px;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #fff;
      background: linear-gradient(135deg, var(--color-accent), var(--color-accent-gold));
      border-radius: var(--radius-pill);
    }
    .card h2 {
      margin: 0 0 var(--space-sm);
      font-size: 1.25rem;
      font-weight: 500;
    }
    .desc {
      font-size: 0.9375rem;
      color: var(--color-text-muted);
      margin: 0 0 var(--space-lg);
      line-height: 1.6;
    }
    .price-wrap {
      margin-bottom: var(--space-xl);
    }
    .price {
      font-family: var(--font-display);
      font-size: 2.75rem;
      font-weight: 600;
      line-height: 1;
      color: var(--color-text);
    }
    .price-currency {
      font-size: 1.25rem;
      font-weight: 400;
      color: var(--color-text-muted);
      margin-left: 2px;
    }
    .features {
      list-style: none;
      padding: 0;
      margin: 0 0 var(--space-xl);
      flex: 1;
    }
    .features li {
      display: flex;
      align-items: flex-start;
      gap: var(--space-sm);
      padding: var(--space-sm) 0;
      font-size: 0.9375rem;
      color: var(--color-text-muted);
      line-height: 1.5;
    }
    .features li + li { border-top: 1px solid var(--color-border-light); }
    .check-icon {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      color: var(--color-accent);
      margin-top: 2px;
    }
    .btn {
      display: block;
      text-align: center;
      padding: 0.875rem var(--space-lg);
      background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%);
      color: #fff;
      border-radius: var(--radius);
      font-weight: 600;
      font-size: 0.875rem;
      letter-spacing: 0.02em;
      transition: transform 0.35s var(--ease-bounce), box-shadow 0.35s var(--ease-out), background 0.3s;
      &:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg), 0 4px 16px rgba(184,132,138,0.25);
        color: #fff;
      }
    }
  `],
})
export class PricingComponent {
  private http = inject(HttpClient);
  packages = signal<PricingPackage[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.http.get<PricingPackage[]>(`${API_URL}/pricing`).subscribe({
      next: (data) => {
        this.packages.set(
          data.map((p) => ({
            ...p,
            price: String(Number.isFinite(Number(p.price)) ? Math.round(Number(p.price)) : p.price),
          }))
        );
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las tarifas.');
        this.loading.set(false);
      },
    });
  }

  formatPrice(price: string): string {
    const n = Number(price);
    return Number.isFinite(n) ? String(Math.round(n)) : price;
  }
}
