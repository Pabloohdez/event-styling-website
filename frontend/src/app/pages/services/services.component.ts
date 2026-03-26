import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

const API_URL = '/api';

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
  order: number;
}

@Component({
  selector: 'app-services',
  imports: [ScrollRevealDirective],
  templateUrl: './services.component.html',
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
    .page-hero h1 {
      margin: 0 0 var(--space-sm);
      animation: fadeInUp 0.8s var(--ease-out) both;
    }
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
      .sk-icon { width: 44px; height: 44px; border-radius: 50%; margin-bottom: var(--space-lg); }
      .sk-title { width: 60%; height: 20px; margin-bottom: var(--space-md); border-radius: var(--radius-sm); }
      .sk-line { width: 100%; height: 14px; margin-bottom: var(--space-sm); border-radius: var(--radius-sm); }
      .sk-line-short { width: 75%; height: 14px; border-radius: var(--radius-sm); }
    }

    .error { text-align: center; color: #b91c1c; padding: var(--space-xl); }
    .empty { text-align: center; color: var(--color-text-muted); padding: var(--space-xl); }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space-xl);
    }
    .card {
      position: relative;
      padding: var(--space-2xl) var(--space-xl);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border-light);
      overflow: hidden;
      transition: transform 0.4s var(--ease-bounce), box-shadow 0.4s var(--ease-out), border-color 0.3s;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 0;
      background: linear-gradient(180deg, var(--color-accent), var(--color-accent-gold));
      border-radius: 0 0 2px 0;
      transition: height 0.4s var(--ease-out);
    }
    .card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-hover);
      border-color: var(--color-accent-soft);
    }
    .card:hover::before { height: 100%; }

    .card .icon-wrap {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-accent-subtle);
      border-radius: 50%;
      margin-bottom: var(--space-lg);
      font-size: 1.25rem;
      transition: background 0.3s, transform 0.4s var(--ease-bounce);
    }
    .card:hover .icon-wrap { background: var(--color-accent); transform: scale(1.1); }
    .card .icon { transition: filter 0.3s; }
    .card:hover .icon { filter: brightness(10); }

    .card h2 {
      margin: 0 0 var(--space-sm);
      font-size: 1.125rem;
      font-weight: 500;
    }
    .card p {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--color-text-muted);
      line-height: 1.65;
    }
  `],
})
export class ServicesComponent {
  private http = inject(HttpClient);
  services = signal<ServiceItem[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.http.get<ServiceItem[]>(`${API_URL}/services`).subscribe({
      next: (data) => {
        this.services.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los servicios.');
        this.loading.set(false);
      },
    });
  }
}
