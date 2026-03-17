import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { SmsService } from '../mail/sms.service';
import { CreateContactDto } from './create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly sms: SmsService,
  ) {}

  async create(dto: CreateContactDto) {
    const result = await this.prisma.contactMessage.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        eventType: dto.eventType,
        message: dto.message,
      },
    });
    await this.mail.sendContactNotification(dto);
    await this.sms.sendContactNotification(dto);
    return result;
  }
}
