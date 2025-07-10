import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '../../infrastructure/types.global';
import { UsersService } from '../users/users.service';
import { LodgingsService } from '../lodgings/lodgings.service';
import { AccommodationsService } from '../accommodations/accommodations.service';
import { BookingRequest } from './dto/booking-request.dto';
import { Booking } from './schema/booking.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private model: Model<Booking>,
    private usersService: UsersService,
    private lodgingsService: LodgingsService,
    private accommodationsService: AccommodationsService,
  ) {}

  async create(data: BookingRequest): Promise<Booking> {
    const isValidUserId = mongoose.isValidObjectId(data.clientId);
    if (!isValidUserId) {
      throw new BadRequestException('Некорректный ID клиента');
    }

    const user = await this.usersService.findById(data.clientId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const lodging = await this.lodgingsService.fetchById(data.lodgingId);
    if (!lodging) {
      throw new NotFoundException('Объект размещения не найден');
    }

    const room = await this.accommodationsService.findById(data.accommodationId);
    if (!room || !room.isActive) {
      throw new BadRequestException('Выбранный номер временно недоступен');
    }

    try {
      const record = new this.model(data);
      return record.save();
    } catch (error) {
      console.error('[ERROR] Не удалось создать бронь:', error.message);
    }
  }

  async delete(id: ID, userId: ID): Promise<Booking> {
    const isValidBookingId = mongoose.isValidObjectId(id);
    if (!isValidBookingId) {
      throw new BadRequestException('Некорректный ID бронирования');
    }

    const booking = await this.model.findById(id);
    if (!booking) {
      throw new NotFoundException('Бронирование не найдено');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (
      booking.clientId.toString() !== userId.toString() &&
      user.role !== 'admin' &&
      user.role !== 'manager'
    ) {
      throw new ForbiddenException('Вы не можете удалить это бронирование');
    }

    return this.model.findByIdAndDelete(id);
  }

  async find(filters: Partial<BookingRequest>): Promise<Booking[]> {
    const { clientId } = filters;

    const isValidClientId = mongoose.isValidObjectId(clientId);
    if (!isValidClientId) {
      throw new BadRequestException('Некорректный ID пользователя');
    }

    const user = await this.usersService.findById(clientId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return this.model
      .find({ clientId })
      .populate('clientId', ['email'])
      .populate('lodgingId', ['name'])
      .populate('accommodationId', ['name'])
      .select('-__v');
  }
}