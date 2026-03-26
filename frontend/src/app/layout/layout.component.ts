import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header" [class.menu-open]="menuOpen()">
      <div class="header-inner">
        <a routerLink="/" class="logo" (click)="closeMenu()">
          <img src="assets/logo.png" alt="Somos Melina" class="logo-img" />
          <span class="logo-text">Somos Melina</span>
        </a>

        <button
          class="hamburger"
          [class.active]="menuOpen()"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen()"
          aria-label="Menú de navegación">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <nav class="nav" [class.open]="menuOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()">Inicio</a>
          <a routerLink="/servicios" routerLinkActive="active" (click)="closeMenu()">Servicios</a>
          <a routerLink="/galeria" routerLinkActive="active" (click)="closeMenu()">Galería</a>
          <a routerLink="/tarifas" routerLinkActive="active" (click)="closeMenu()">Tarifas</a>
          <a routerLink="/contacto" routerLinkActive="active" (click)="closeMenu()">Contacto</a>
        </nav>
      </div>
      <div class="header-accent"></div>
    </header>

    <main class="main">
      <ng-content />
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="footer-logo">Somos Melina</span>
          <p>Diseño de eventos con alma. Decoración personalizada en Tenerife con desplazamiento a toda la isla.</p>
        </div>
        <div class="footer-links">
          <h4>Explora</h4>
          <a routerLink="/">Inicio</a>
          <a routerLink="/servicios">Servicios</a>
          <a routerLink="/galeria">Galería</a>
          <a routerLink="/tarifas">Tarifas</a>
        </div>
        <div class="footer-contact">
          <h4>Contacto</h4>
          <a routerLink="/contacto">Solicitar presupuesto</a>
          <a href="https://wa.me/34628796348" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <p class="footer-location">Tenerife, Islas Canarias</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Somos Melina. Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; min-height: 100vh; }

    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(250, 245, 243, 0.82);
      backdrop-filter: blur(20px) saturate(1.4);
      -webkit-backdrop-filter: blur(20px) saturate(1.4);
      transition: background var(--transition), box-shadow var(--transition);
    }
    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 72rem;
      margin: 0 auto;
      padding: var(--space-md) var(--space-xl);
    }
    .header-accent {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--color-accent-soft), var(--color-accent), var(--color-accent-soft), transparent);
      opacity: 0.5;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      transition: opacity var(--transition);
      &:hover { opacity: 0.8; color: var(--color-text); }
    }
    .logo-img {
      height: 36px;
      width: auto;
      object-fit: contain;
    }
    .logo-text {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: var(--color-text);
    }

    /* Hamburger */
    .hamburger {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: var(--space-xs);
      width: 32px;
      height: 24px;
      position: relative;
      z-index: 110;
    }
    .hamburger-line {
      display: block;
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--color-text);
      border-radius: 2px;
      transition: transform 0.35s var(--ease-out), opacity 0.25s var(--ease-out);
    }
    .hamburger-line:nth-child(1) { top: 2px; }
    .hamburger-line:nth-child(2) { top: 11px; }
    .hamburger-line:nth-child(3) { top: 20px; }
    .hamburger.active .hamburger-line:nth-child(1) { top: 11px; transform: rotate(45deg); }
    .hamburger.active .hamburger-line:nth-child(2) { opacity: 0; }
    .hamburger.active .hamburger-line:nth-child(3) { top: 11px; transform: rotate(-45deg); }

    /* Nav */
    .nav {
      display: flex;
      align-items: center;
      gap: var(--space-xl);
      a {
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        position: relative;
        padding: var(--space-xs) 0;
        transition: color 0.3s var(--ease-out);
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background: var(--color-accent);
          transition: width 0.35s var(--ease-out);
          border-radius: 1px;
        }
        &:hover, &.active { color: var(--color-text); }
        &:hover::after, &.active::after { width: 100%; }
      }
    }

    /* Main */
    .main { flex: 1; }

    /* Footer */
    .footer {
      background: var(--color-dark);
      color: rgba(255, 255, 255, 0.85);
      padding-top: var(--space-4xl);
    }
    .footer-inner {
      max-width: 72rem;
      margin: 0 auto;
      padding: 0 var(--space-xl);
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: var(--space-3xl);
    }
    .footer-brand p {
      margin-top: var(--space-md);
      font-size: 0.9rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.55);
      max-width: 28rem;
    }
    .footer-logo {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: #fff;
    }
    .footer h4 {
      font-family: var(--font-body);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--color-accent-soft);
      margin: 0 0 var(--space-lg);
    }
    .footer-links, .footer-contact {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      a {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.6);
        transition: color 0.3s var(--ease-out);
        &:hover { color: #fff; }
      }
    }
    .footer-location {
      margin-top: var(--space-sm);
      font-size: 0.8125rem;
      color: rgba(255, 255, 255, 0.4);
    }
    .footer-bottom {
      margin-top: var(--space-3xl);
      padding: var(--space-lg) var(--space-xl);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      text-align: center;
      p {
        font-size: 0.8125rem;
        color: rgba(255, 255, 255, 0.35);
        margin: 0;
      }
    }

    /* ── Mobile ── */
    @media (max-width: 768px) {
      .hamburger { display: block; }
      .nav {
        position: fixed;
        inset: 0;
        background: var(--color-bg);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-2xl);
        z-index: 105;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.35s var(--ease-out);
        a {
          font-size: 1.25rem;
          transform: translateY(16px);
          opacity: 0;
          transition: transform 0.4s var(--ease-out), opacity 0.4s var(--ease-out), color 0.3s var(--ease-out);
        }
        &.open {
          opacity: 1;
          pointer-events: auto;
          a {
            transform: translateY(0);
            opacity: 1;
          }
          a:nth-child(1) { transition-delay: 0.05s; }
          a:nth-child(2) { transition-delay: 0.10s; }
          a:nth-child(3) { transition-delay: 0.15s; }
          a:nth-child(4) { transition-delay: 0.20s; }
          a:nth-child(5) { transition-delay: 0.25s; }
        }
      }
      .footer-inner { grid-template-columns: 1fr; gap: var(--space-2xl); }
    }
  `],
})
export class LayoutComponent {
  menuOpen = signal(false);
  currentYear = new Date().getFullYear();

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
