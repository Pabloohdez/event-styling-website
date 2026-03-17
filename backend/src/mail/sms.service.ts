import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import { CreateContactDto } from '../contact/create-contact.dto';

const CONTACT_NOTIFY_PHONE = process.env.CONTACT_NOTIFY_PHONE || '+34628796348';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

@Injectable()
export class SmsService {
  private client: twilio.Twilio | null = null;

  constructor() {
    if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER) {
      this.client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    }
  }

  async sendContactNotification(dto: CreateContactDto): Promise<void> {
    if (!this.client) {
      console.warn('SMS: Twilio no configurado. Añade TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN y TWILIO_PHONE_NUMBER en .env para avisos al móvil.');
      return;
    }
    const msg = `Event Styling: nuevo contacto de ${dto.name} (${dto.email}). Revisa tu correo.`;
    try {
      await this.client!.messages.create({
        body: msg,
        from: TWILIO_PHONE_NUMBER!,
        to: CONTACT_NOTIFY_PHONE,
      });
    } catch (err) {
      console.error('SMS: error al enviar aviso', err);
    }
  }
}
