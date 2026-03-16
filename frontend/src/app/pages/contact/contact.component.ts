import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

const API_URL = '/api';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="page-hero">
      <h1>Contacto</h1>
      <p class="lead">Cuéntanos tu evento y te enviamos un presupuesto sin compromiso</p>
    </section>
    <section class="content">
      <div class="container narrow">
        @if (sent()) {
          <div class="success">
            <p>Mensaje enviado correctamente. Te responderemos lo antes posible.</p>
            <a routerLink="/">Volver al inicio</a>
          </div>
        } @else {
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
            <label>
              Nombre
              <input type="text" formControlName="name" placeholder="Tu nombre" />
            </label>
            <label>
              Email
              <input type="email" formControlName="email" placeholder="tu@email.com" />
            </label>
            <label>
              Teléfono <span class="optional">(opcional)</span>
              <input type="tel" formControlName="phone" placeholder="+34 600 000 000" />
            </label>
            <label>
              Tipo de evento <span class="optional">(opcional)</span>
              <select formControlName="eventType">
                <option value="">Selecciona</option>
                <option value="baby-shower">Baby shower</option>
                <option value="boda">Boda</option>
                <option value="comunion">Comunión</option>
                <option value="cumpleanos">Cumpleaños</option>
                <option value="otro">Otro</option>
              </select>
            </label>
            <label>
              Mensaje
              <textarea formControlName="message" rows="5" placeholder="Describe tu evento, fecha aproximada y qué te gustaría..."></textarea>
            </label>
            @if (error()) {
              <p class="error">{{ error() }}</p>
            }
            <button type="submit" class="btn" [disabled]="form.invalid || sending()">
              {{ sending() ? 'Enviando…' : 'Enviar mensaje' }}
            </button>
          </form>
        }
      </div>
    </section>
  `,
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
    .container.narrow { max-width: 32rem; }
    .form label {
      display: block;
      margin-bottom: var(--space-lg);
      font-size: 0.9375rem;
      font-weight: 500;
    }
    .form input, .form select, .form textarea {
      width: 100%;
      margin-top: var(--space-xs);
      padding: var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      font-family: inherit;
      font-size: 1rem;
    }
    .form textarea { resize: vertical; min-height: 120px; }
    .optional { font-weight: 400; color: var(--color-text-muted); }
    .error { color: #b91c1c; margin-bottom: var(--space-md); }
    .btn {
      width: 100%;
      padding: var(--space-md);
      background: var(--color-text);
      color: var(--color-bg);
      border: none;
      border-radius: var(--radius);
      font-weight: 500;
      font-size: 1rem;
      cursor: pointer;
      &:hover:not(:disabled) { background: var(--color-accent); }
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }
    .success {
      text-align: center;
      padding: var(--space-2xl);
      background: var(--color-bg-alt);
      border-radius: var(--radius-lg);
    }
    .success a { font-weight: 500; }
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

  onSubmit() {
    this.error.set(null);
    if (this.form.invalid) return;
    this.sending.set(true);
    this.http.post(`${API_URL}/contact`, this.form.getRawValue()).subscribe({
      next: () => {
        this.sent.set(true);
        this.sending.set(false);
      },
      error: () => {
        this.error.set('No se pudo enviar el mensaje. Inténtalo de nuevo.');
        this.sending.set(false);
      },
    });
  }
}
