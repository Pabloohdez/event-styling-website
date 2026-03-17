import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateContactDto } from '../contact/create-contact.dto';

const CONTACT_NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || 'pablohdez.545@gmail.com';
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
    }
  }

  async sendContactNotification(dto: CreateContactDto): Promise<void> {
    if (!this.transporter) {
      console.warn('Mail: SMTP no configurado. Configura SMTP_* y CONTACT_NOTIFY_EMAIL en .env para recibir avisos por email.');
      return;
    }
    const eventTypeLabel = dto.eventType
      ? { 'baby-shower': 'Baby shower', boda: 'Boda', comunion: 'Comunión', cumpleanos: 'Cumpleaños', otro: 'Otro' }[dto.eventType] || dto.eventType
      : '—';
    const body = [
      `Nombre: ${dto.name}`,
      `Email: ${dto.email}`,
      `Teléfono: ${dto.phone || '—'}`,
      `Tipo de evento: ${eventTypeLabel}`,
      '',
      'Mensaje:',
      dto.message,
    ].join('\n');
    try {
      await this.transporter.sendMail({
        from: SMTP_USER,
        to: CONTACT_NOTIFY_EMAIL,
        replyTo: dto.email,
        subject: `Event Styling - Nuevo contacto: ${dto.name}`,
        text: body,
      });
    } catch (err) {
      console.error('Mail: error al enviar aviso de contacto', err);
    }
  }
}
