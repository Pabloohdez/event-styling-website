import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <a routerLink="/" class="logo">Event Styling</a>
      <nav class="nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
        <a routerLink="/servicios" routerLinkActive="active">Servicios</a>
        <a routerLink="/galeria" routerLinkActive="active">Galería</a>
        <a routerLink="/tarifas" routerLinkActive="active">Tarifas</a>
        <a routerLink="/contacto" routerLinkActive="active">Contacto</a>
      </nav>
    </header>
    <main class="main">
      <ng-content />
    </main>
    <footer class="footer">
      <p>Event Styling Tenerife · Diseño de eventos con desplazamiento</p>
      <p class="muted">Tarifas competitivas y personalización total</p>
    </footer>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
    .header {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-md) var(--space-xl);
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      box-shadow: var(--shadow);
    }
    .logo {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 600;
    }
    .nav {
      display: flex;
      gap: var(--space-xl);
      a {
        font-size: 0.9375rem;
        font-weight: 500;
        color: var(--color-text-muted);
        &.active { color: var(--color-text); }
      }
    }
    .main { flex: 1; }
    .footer {
      padding: var(--space-2xl) var(--space-xl);
      text-align: center;
      background: var(--color-bg-alt);
      border-top: 1px solid var(--color-border);
      font-size: 0.875rem;
      color: var(--color-text-muted);
      .muted { margin-top: var(--space-xs); font-size: 0.8125rem; opacity: 0.9; }
    }
    @media (max-width: 768px) {
      .header { flex-direction: column; gap: var(--space-md); }
      .nav { flex-wrap: wrap; justify-content: center; gap: var(--space-md); }
    }
  `],
})
export class LayoutComponent {}
