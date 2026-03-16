import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1>Diseño de eventos que cuenta tu historia</h1>
        <p class="lead">Decoración personalizada en Tenerife. Baby showers, bodas, comuniones y más. Profesional con desplazamiento y tarifas competitivas.</p>
        <div class="cta">
          <a routerLink="/galeria" class="btn btn-primary">Ver galería</a>
          <a routerLink="/contacto" class="btn btn-secondary">Solicitar presupuesto</a>
        </div>
      </div>
    </section>
    <section class="intro">
      <div class="container">
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
    <section class="preview">
      <div class="container">
        <h2>Últimos trabajos</h2>
        <p class="muted">Baby showers, primeros cumpleaños, eventos corporativos y celebraciones íntimas.</p>
        <a routerLink="/galeria" class="link-arrow">Ver toda la galería →</a>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: var(--space-3xl) var(--space-xl);
      background: linear-gradient(165deg, #f8f6f4 0%, var(--color-bg-alt) 40%, var(--color-bg) 100%);
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 60%;
      height: 140%;
      background: radial-gradient(ellipse, rgba(180,83,74,0.06) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-content { max-width: 42rem; margin: 0 auto; position: relative; z-index: 1; }
    .hero h1 {
      margin-bottom: var(--space-lg);
      color: var(--color-text);
      animation: fadeInUp 0.7s var(--ease-out) both;
    }
    .lead {
      font-size: 1.125rem;
      color: var(--color-text-muted);
      margin-bottom: var(--space-2xl);
      animation: fadeInUp 0.7s var(--ease-out) 0.15s both;
    }
    .cta { display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap; animation: fadeInUp 0.7s var(--ease-out) 0.3s both; }
    .btn {
      display: inline-block;
      padding: var(--space-md) var(--space-xl);
      border-radius: var(--radius);
      font-weight: 500;
      transition: transform var(--transition), background var(--transition), color var(--transition), border-color var(--transition), box-shadow var(--transition);
    }
    .btn:hover { transform: translateY(-2px); }
    .btn-primary {
      background: var(--color-text);
      color: var(--color-bg);
      box-shadow: var(--shadow);
      &:hover { background: var(--color-accent-warm); color: #fff; box-shadow: var(--shadow-hover); }
    }
    .btn-secondary {
      background: transparent;
      color: var(--color-text);
      border: 2px solid var(--color-border);
      &:hover { border-color: var(--color-accent-warm); color: var(--color-accent-warm); }
    }
    .intro { padding: var(--space-3xl) var(--space-xl); }
    .container { max-width: 64rem; margin: 0 auto; }
    .intro h2 { text-align: center; margin-bottom: var(--space-lg); }
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
      border: 1px solid var(--color-border);
      text-align: center;
      transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
    }
    .card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-hover);
      border-color: var(--color-highlight);
    }
    .card-icon { font-size: 1.75rem; color: var(--color-accent-warm); display: block; margin-bottom: var(--space-sm); transition: transform var(--transition); }
    .card:hover .card-icon { transform: scale(1.1); }
    .card h3 { margin-bottom: var(--space-sm); font-size: 1.125rem; }
    .card p { font-size: 0.9375rem; color: var(--color-text-muted); margin: 0; }
    .preview { padding: var(--space-2xl) var(--space-xl); background: var(--color-bg-alt); }
    .preview h2 { margin-bottom: var(--space-sm); }
    .preview .muted { color: var(--color-text-muted); margin-bottom: var(--space-md); }
    .link-arrow {
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 0.35em;
      transition: gap var(--transition), color var(--transition);
      &:hover { gap: 0.6em; color: var(--color-accent-warm); }
    }
  `],
})
export class HomeComponent {}
