import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '../../infrastructure/types.global';
import { UsersService } from '../users/users.service';
import { ClientRequestCreate } from './dto/client-request-create.dto';
import { MarkMessagesAsReadDto } from './dto/read-messages.dto';
import { TicketMessage } from './schemas/ticket-message.schema';
import { AssistanceTicket } from './schemas/assistance-ticket.schema';

@Injectable()
export class ClientAssistanceService {
  constructor(
    @InjectModel(AssistanceTicket.name)
    private assistanceModel: Model<AssistanceTicket>,
    private usersService: UsersService,
  ) {}

  async startClientAssistance(
    request: ClientRequestCreate,
  ): Promise<AssistanceTicket> {
    const isValidUserId = mongoose.isValidObjectId(request.clientId);
    if (!isValidUserId) {
      throw new BadRequestException('Некорректный ID пользователя');
    }

    const user = await this.usersService.findById(request.clientId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    try {
      const ticket = new this.assistanceModel({
        clientId: request.clientId,
      });

      return ticket.save();
    } catch (error) {
      console.error('[ERROR] Не удалось создать обращение:', error.message);
    }
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const isValidTicketId = mongoose.isValidObjectId(params.ticketId);
    if (!isValidTicketId) {
      throw new BadRequestException('Некорректный ID обращения');
    }

    const ticket = await this.assistanceModel
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

    const ticket = await this.assistanceModel
      .findById(ticketId)
      .select('-__v')
      .exec();

    if (!ticket) {
      throw new NotFoundException('Обращение не найдено');
    }

    return ticket.messages.filter((msg) => !msg.readAt) || [];
  }
}