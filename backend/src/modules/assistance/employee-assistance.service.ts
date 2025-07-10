import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from 'src/infrastructure/types.global';
import { MarkMessagesAsReadDto } from './dto/read-messages.dto';
import { TicketMessage } from './schemas/ticket-message.schema';
import { AssistanceTicket } from './schemas/assistance-ticket.schema';

@Injectable()
export class EmployeeAssistanceService {
  constructor(
    @InjectModel(AssistanceTicket.name)
    private ticketModel: Model<AssistanceTicket>,
  ) {}

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const isValidTicketId = mongoose.isValidObjectId(params.ticketId);
    if (!isValidTicketId) {
      throw new BadRequestException('Некорректный ID обращения');
    }

    const ticket = await this.ticketModel
      .findById(params.ticketId)
      .select('-__v')
      .exec();

    if (!ticket) {
      throw new NotFoundException('Обращение не найдено');
    }

    try {
      ticket.messages
        .filter((msg) => msg.authorId != params.readerId)
        .filter((msg) => msg.sentAt <= params.beforeDate)
        .forEach((msg) => {
          msg.readAt = new Date();
          msg.save();
        });
    } catch (error) {
      console.error('[ERROR] Не удалось отметить сообщения как прочитанные:', error.message);
    }
  }

  async getUnreadCount(ticketId: ID): Promise<TicketMessage[]> {
    const isValidTicketId = mongoose.isValidObjectId(ticketId);
    if (!isValidTicketId) {
      throw new BadRequestException('Некорректный ID обращения');
    }

    const ticket = await this.ticketModel
      .findById(ticketId)
      .select('-__v')
      .exec();

    if (!ticket) {
      throw new NotFoundException('Обращение не найдено');
    }

    return ticket.messages.filter((msg) => !msg.readAt) || [];
  }

  async resolveTicket(ticketId: ID): Promise<void> {
    const isValidTicketId = mongoose.isValidObjectId(ticketId);
    if (!isValidTicketId) {
      throw new BadRequestException('Некорректный ID обращения');
    }

    const ticket = await this.ticketModel
      .findById(ticketId)
      .select('-__v')
      .exec();

    if (!ticket) {
      throw new NotFoundException('Обращение не найдено');
    }

    try {
      ticket.isOpened = false;
      await ticket.save();
    } catch (error) {
      console.error('[ERROR] Не удалось закрыть обращение:', error.message);
    }
  }
}