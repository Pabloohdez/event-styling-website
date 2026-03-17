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
      border-bottom: 2px solid var(--color-border);
      box-shadow: var(--shadow);
      transition: box-shadow var(--transition), border-color var(--transition);
    }
    .header:hover { box-shadow: var(--shadow-lg); border-color: var(--color-highlight); }
    .logo {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 600;
      transition: color var(--transition), transform var(--transition);
      &:hover { color: var(--color-accent); transform: scale(1.03); }
    }
    .nav {
      display: flex;
      gap: var(--space-xl);
      a {
        font-size: 0.9375rem;
        font-weight: 500;
        color: var(--color-text-muted);
        position: relative;
        padding: var(--space-xs) 0;
        transition: color 0.35s var(--ease-out);
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-accent), var(--color-accent-soft));
          transition: width 0.35s var(--ease-out);
          border-radius: 2px;
        }
        &:hover, &.active { color: var(--color-text); }
        &:hover::after, &.active::after { width: 100%; }
      }
    }
    .main { flex: 1; }
    .footer {
      padding: var(--space-2xl) var(--space-xl);
      text-align: center;
      background: linear-gradient(180deg, #5E3F44 0%, #3E3333 100%);
      border-top: 3px solid var(--color-accent);
      font-size: 0.875rem;
      color: rgba(255,255,255,0.9);
      transition: border-color var(--transition);
      .muted { margin-top: var(--space-xs); font-size: 0.8125rem; color: rgba(255,255,255,0.65); }
    }
    @media (max-width: 768px) {
      .header { flex-direction: column; gap: var(--space-md); }
      .nav { flex-wrap: wrap; justify-content: center; gap: var(--space-md); }
    }
  `],
})
export class LayoutComponent {}
