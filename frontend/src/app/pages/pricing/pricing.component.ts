import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

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
  imports: [RouterLink],
  templateUrl: './pricing.component.html',
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
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-xl); align-items: start; }
    .card {
      padding: var(--space-xl);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
    }
    .card.highlighted { border-color: var(--color-accent); box-shadow: var(--shadow-lg); }
    .card h2 { margin: 0 0 var(--space-sm); font-size: 1.25rem; }
    .desc { font-size: 0.9375rem; color: var(--color-text-muted); margin: 0 0 var(--space-md); }
    .price { font-family: var(--font-display); font-size: 1.75rem; font-weight: 600; margin-bottom: var(--space-lg); }
    .features {
      list-style: none;
      padding: 0;
      margin: 0 0 var(--space-xl);
      flex: 1;
    }
    .features li {
      padding: var(--space-xs) 0;
      font-size: 0.9375rem;
      color: var(--color-text-muted);
      border-bottom: 1px solid var(--color-border);
      &:last-child { border-bottom: none; }
    }
    .btn {
      display: block;
      text-align: center;
      padding: var(--space-md);
      background: var(--color-text);
      color: var(--color-bg);
      border-radius: var(--radius);
      font-weight: 500;
      &:hover { background: var(--color-accent); }
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
        this.packages.set(data.map((p) => ({ ...p, price: String(p.price) })));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las tarifas.');
        this.loading.set(false);
      },
    });
  }
}
