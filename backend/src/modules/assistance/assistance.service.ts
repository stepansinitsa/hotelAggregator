import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '../../infrastructure/types.global';
import { UsersService } from '../users/users.service';
import { FetchAssistanceListParams } from './dto/fetch-assistance-list.dto';
import { SubmitMessageDto } from './dto/submit-message.dto';
import { TicketMessage } from './schemas/ticket-message.schema';
import { AssistanceTicket } from './schemas/assistance-ticket.schema';
import { EventBusService } from '../event-bus/event-bus.service';

@Injectable()
export class AssistanceService {
  constructor(
    @InjectModel(AssistanceTicket.name)
    private ticketModel: Model<AssistanceTicket>,
    @InjectModel(TicketMessage.name) private messageModel: Model<TicketMessage>,
    private usersService: UsersService,
    private eventBus: EventBusService,
    private eventEmitter: EventEmitter2,
  ) {}

  async findTickets(filters: FetchAssistanceListParams): Promise<AssistanceTicket[]> {
    return this.ticketModel
      .find(filters)
      .populate('clientId', ['email', 'name', 'contactPhone'])
      .select('-__v');
  }

  async postNewMessage(data: SubmitMessageDto): Promise<TicketMessage> {
    const { ticketId, authorId, content } = data;
    const isValidTicketId = mongoose.isValidObjectId(ticketId);
    if (!isValidTicketId) {
      throw new BadRequestException('Некорректный ID обращения');
    }

    const ticket = await this.ticketModel.findById(ticketId).select('-__v').exec();
    if (!ticket) {
      throw new NotFoundException('Обращение не найдено');
    }

    const isValidUserId = mongoose.isValidObjectId(authorId);
    if (!isValidUserId) {
      throw new BadRequestException('Некорректный ID пользователя');
    }

    const user = await this.usersService.findById(authorId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (
      ticket.clientId.toString() !== authorId.toString() &&
      user.role !== 'admin' &&
      user.role !== 'manager'
    ) {
      throw new ForbiddenException('Вы не можете отправлять сообщения в это обращение');
    }

    try {
      const message = new this.messageModel({
        authorId,
        content,
        sentAt: new Date(),
      });

      await message.save();

      ticket.messages.push(message);
      await ticket.save();

      this.eventEmitter.emit('newMessage', { ticket, message });
      this.eventBus.ioServer.to(ticketId.toString()).emit('chatMessage', { ticket, message });

      return message;
    } catch (error) {
      console.error('[ERROR] Не удалось отправить сообщение:', error.message);
      throw error;
    }
  }

  async fetchMessages(ticketId: ID, userId: ID): Promise<TicketMessage[]> {
    const isValidTicketId = mongoose.isValidObjectId(ticketId);
    if (!isValidTicketId) {
      throw new BadRequestException('Некорректный ID обращения');
    }

    const ticket = await this.ticketModel.findById(ticketId.toString());
    if (!ticket) {
      throw new NotFoundException('Обращение не найдено');
    }

    const isValidUserId = mongoose.isValidObjectId(userId);
    if (!isValidUserId) {
      throw new BadRequestException('Некорректный ID пользователя');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (
      ticket.clientId.toString() !== userId.toString() &&
      user.role !== 'admin' &&
      user.role !== 'manager'
    ) {
      throw new ForbiddenException('У вас нет доступа к этим сообщениям');
    }

    return ticket.messages || [];
  }

  subscribe(handler: (ticket: AssistanceTicket, message: TicketMessage) => void): () => void {
    this.eventEmitter.on('newMessage', ({ ticket, message }) => {
      handler(ticket, message);
    });
    return;
  }
}