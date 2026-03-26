import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

const API_URL = '/api';
const WHATSAPP_NUMBER_E164 = '34628796348';

function eventTypeLabel(value: string | null | undefined): string {
  if (!value) return '—';
  return (
    {
      'baby-shower': 'Baby shower',
      boda: 'Boda',
      comunion: 'Comunión',
      cumpleanos: 'Cumpleaños',
      otro: 'Otro',
    }[value] ?? value
  );
}

function buildWhatsAppUrl(payload: {
  name: string;
  email: string;
  phone?: string | null;
  eventType?: string | null;
  message: string;
}): string {
  const text = [
    `Hola, soy ${payload.name}.`,
    `Email: ${payload.email}`,
    `Teléfono: ${payload.phone || '—'}`,
    `Tipo de evento: ${eventTypeLabel(payload.eventType)}`,
    '',
    payload.message,
  ].join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(text)}`;
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="page-hero">
      <h1>Contacto</h1>
      <div class="hero-line" aria-hidden="true"></div>
      <p class="lead">Cuéntanos tu evento y te enviamos un presupuesto sin compromiso</p>
    </section>
    <section class="content">
      <div class="container">
        <div class="contact-grid">
          <!-- Form -->
          <div class="form-col">
            @if (sent()) {
              <div class="success">
                <div class="success-check">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" stroke="var(--color-accent)" stroke-width="2"/>
                    <path d="M14 24l7 7 13-14" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h3>Mensaje enviado</h3>
                <p>Te responderemos lo antes posible. ¡Gracias por confiar en nosotros!</p>
                @if (whatsAppUrl()) {
                  <a class="btn-wa" [href]="whatsAppUrl()" target="_blank" rel="noopener noreferrer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                    Enviar también por WhatsApp
                  </a>
                  <p class="wa-note">Se abrirá WhatsApp con el mensaje ya escrito.</p>
                }
                <a routerLink="/" class="back-link">← Volver al inicio</a>
              </div>
            } @else {
              <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
                <div class="field">
                  <label for="name">Nombre</label>
                  <input id="name" type="text" formControlName="name" placeholder="Tu nombre completo" />
                </div>
                <div class="field">
                  <label for="email">Email</label>
                  <input id="email" type="email" formControlName="email" placeholder="tu@email.com" />
                </div>
                <div class="field-row">
                  <div class="field">
                    <label for="phone">Teléfono <span class="optional">opcional</span></label>
                    <input id="phone" type="tel" formControlName="phone" placeholder="+34 600 000 000" />
                  </div>
                  <div class="field">
                    <label for="eventType">Tipo de evento <span class="optional">opcional</span></label>
                    <select id="eventType" formControlName="eventType">
                      <option value="">Selecciona</option>
                      <option value="baby-shower">Baby shower</option>
                      <option value="boda">Boda</option>
                      <option value="comunion">Comunión</option>
                      <option value="cumpleanos">Cumpleaños</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div class="field">
                  <label for="message">Mensaje</label>
                  <textarea id="message" formControlName="message" rows="5" placeholder="Describe tu evento, fecha aproximada y qué te gustaría..."></textarea>
                </div>
                @if (error()) {
                  <p class="error">{{ error() }}</p>
                }
                <button type="submit" class="btn-submit" [disabled]="form.invalid || sending()">
                  @if (sending()) {
                    <span class="spinner"></span>
                    Enviando…
                  } @else {
                    Enviar mensaje
                  }
                </button>
              </form>
            }
          </div>

          <!-- Info sidebar -->
          <aside class="info-col">
            <div class="info-card">
              <h3>Hablemos</h3>
              <p>Si prefieres un trato más directo, no dudes en escribirnos por WhatsApp o email.</p>

              <div class="info-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2.5 6.667L10 11.25l7.5-4.583" stroke="var(--color-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="2.5" y="4.167" width="15" height="11.667" rx="2" stroke="var(--color-accent)" stroke-width="1.5"/></svg>
                <span>pablohdez.545&#64;gmail.com</span>
              </div>

              <div class="info-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 10.833a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="var(--color-accent)" stroke-width="1.5"/><path d="M10 17.5s6.25-4.375 6.25-9.167a6.25 6.25 0 00-12.5 0C3.75 13.125 10 17.5 10 17.5z" stroke="var(--color-accent)" stroke-width="1.5"/></svg>
                <span>Tenerife, Islas Canarias</span>
              </div>

              <a class="wa-link" href="https://wa.me/34628796348" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                Escríbenos por WhatsApp
              </a>
            </div>

            <div class="info-note">
              <p>Respondemos en menos de 24 horas. Presupuestos gratuitos y sin compromiso.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `,
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

    .contact-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: var(--space-3xl);
      align-items: start;
    }

    /* Form */
    .form { display: flex; flex-direction: column; gap: var(--space-lg); }
    .field { display: flex; flex-direction: column; gap: var(--space-xs); }
    .field label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-text);
    }
    .optional {
      font-weight: 400;
      font-size: 0.75rem;
      color: var(--color-text-light);
      margin-left: var(--space-xs);
    }
    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-lg);
    }
    .form input, .form select, .form textarea {
      width: 100%;
      padding: 0.8rem var(--space-md);
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius);
      font-family: inherit;
      font-size: 0.9375rem;
      color: var(--color-text);
      background: var(--color-surface-elevated);
      transition: border-color 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
      &::placeholder { color: var(--color-text-light); }
      &:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px var(--color-accent-subtle);
      }
    }
    .form select { cursor: pointer; }
    .form textarea { resize: vertical; min-height: 120px; }
    .error { color: #b91c1c; font-size: 0.875rem; margin: 0; }

    .btn-submit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      width: 100%;
      padding: 0.9rem var(--space-xl);
      background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%);
      color: #fff;
      border: none;
      border-radius: var(--radius);
      font-family: inherit;
      font-weight: 600;
      font-size: 0.9375rem;
      cursor: pointer;
      transition: transform 0.35s var(--ease-bounce), box-shadow 0.35s var(--ease-out), background 0.3s, opacity 0.3s;
      &:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg), 0 4px 16px rgba(184,132,138,0.25);
      }
      &:disabled { opacity: 0.55; cursor: not-allowed; }
    }
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Success */
    .success {
      text-align: center;
      padding: var(--space-3xl) var(--space-xl);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border-light);
      animation: scaleIn 0.4s var(--ease-bounce);
    }
    .success-check {
      margin-bottom: var(--space-lg);
      svg { animation: scaleIn 0.5s var(--ease-bounce) 0.15s both; }
    }
    .success h3 { margin: 0 0 var(--space-sm); }
    .success p { color: var(--color-text-muted); margin: 0 0 var(--space-xl); }
    .btn-wa {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-pill);
      border: 1px solid rgba(37,211,102,0.25);
      background: rgba(37,211,102,0.08);
      color: var(--color-text);
      font-weight: 500;
      font-size: 0.875rem;
      transition: transform 0.35s var(--ease-bounce), box-shadow 0.3s, border-color 0.3s;
      svg { color: #25d366; }
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow);
        border-color: rgba(37,211,102,0.4);
        color: var(--color-text);
      }
    }
    .wa-note {
      margin: var(--space-sm) 0 var(--space-xl);
      font-size: 0.8125rem;
      color: var(--color-text-light);
    }
    .back-link {
      font-weight: 500;
      font-size: 0.875rem;
      color: var(--color-accent-dark);
      &:hover { color: var(--color-accent); }
    }

    /* Info sidebar */
    .info-col { display: flex; flex-direction: column; gap: var(--space-lg); }
    .info-card {
      padding: var(--space-2xl);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border-light);
      h3 {
        margin: 0 0 var(--space-sm);
        font-size: 1.25rem;
      }
      p {
        color: var(--color-text-muted);
        font-size: 0.9375rem;
        margin: 0 0 var(--space-xl);
        line-height: 1.65;
      }
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-md);
      font-size: 0.9375rem;
      color: var(--color-text-muted);
      svg { flex-shrink: 0; }
    }
    .wa-link {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      margin-top: var(--space-md);
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-pill);
      background: rgba(37,211,102,0.08);
      border: 1px solid rgba(37,211,102,0.2);
      color: var(--color-text);
      font-weight: 500;
      font-size: 0.875rem;
      transition: transform 0.3s var(--ease-bounce), box-shadow 0.3s, border-color 0.3s;
      svg { color: #25d366; }
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow);
        border-color: rgba(37,211,102,0.4);
        color: var(--color-text);
      }
    }
    .info-note {
      padding: var(--space-lg);
      background: var(--color-accent-subtle);
      border-radius: var(--radius-lg);
      border-left: 3px solid var(--color-accent);
      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--color-text-muted);
        line-height: 1.6;
      }
    }

    @media (max-width: 768px) {
      .contact-grid { grid-template-columns: 1fr; }
      .field-row { grid-template-columns: 1fr; }
      .info-col { order: -1; }
    }
  `],
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    eventType: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });
  sending = signal(false);
  sent = signal(false);
  error = signal<string | null>(null);
  whatsAppUrl = signal<string | null>(null);

  onSubmit() {
    this.error.set(null);
    if (this.form.invalid) return;
    this.sending.set(true);
    const payload = this.form.getRawValue() as {
      name: string;
      email: string;
      phone?: string | null;
      eventType?: string | null;
      message: string;
    };
    this.http.post(`${API_URL}/contact`, payload).subscribe({
      next: () => {
        this.sent.set(true);
        this.whatsAppUrl.set(buildWhatsAppUrl(payload));
        this.sending.set(false);
      },
      error: () => {
        this.error.set('No se pudo enviar el mensaje. Inténtalo de nuevo.');
        this.sending.set(false);
      },
    });
  }
}
