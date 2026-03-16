import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  templateUrl: './services.component.html',
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
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-xl); }
    .card {
      padding: var(--space-xl);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
    }
    .card .icon { font-size: 1.5rem; display: block; margin-bottom: var(--space-md); color: var(--color-accent); }
    .card h2 { margin-bottom: var(--space-md); font-size: 1.25rem; }
    .card p { margin: 0; font-size: 0.9375rem; color: var(--color-text-muted); }
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
