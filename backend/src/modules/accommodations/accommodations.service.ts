import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '../../infrastructure/types.global';
import { AccommodationCreateDto } from './dto/accommodation-create.dto';
import { SearchAccommodationParamsDto } from './dto/search-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { Accommodation } from './schema/accommodation.schema';

@Injectable()
export class AccommodationsService {
  constructor(
    @InjectModel(Accommodation.name) private model: Model<Accommodation>,
  ) {}

  async add(data: AccommodationCreateDto): Promise<Accommodation> {
    if (!mongoose.isValidObjectId(data.lodgingId)) {
      throw new BadRequestException('Указан некорректный идентификатор жилья');
    }

    data.isActive = true;

    try {
      const record = new this.model(data);
      return await record.save();
    } catch (e) {
      console.error('[ERROR] Не удалось добавить жильё:', e.message);
    }
  }

  async modify(
    id: ID,
    updates: UpdateAccommodationDto,
  ): Promise<Accommodation> {
    return await this.model.findByIdAndUpdate(
      { _id: id },
      { $set: { ...updates } },
      { new: true },
    );
  }

  async findById(id: ID): Promise<Accommodation> {
  const isValidId = mongoose.isValidObjectId(id);
  if (!isValidId) {
    throw new BadRequestException('Некорректный ID номера');
  }

  const room = await this.model.findById(id);
  if (!room) {
    throw new NotFoundException('Номер не найден');
  }

  return room;
}

  async find(params: SearchAccommodationParamsDto): Promise<Accommodation[]> {
    const { limit, offset, lodgingId, name, isActive } = params;
    const query: Partial<SearchAccommodationParamsDto> = {
      lodgingId,
      name: name ? { $regex: new RegExp(name, 'i') } : undefined,
    };

    if (typeof isActive !== 'undefined') {
      query.isActive = isActive;
    }

    return await this.model
      .find(query)
      .limit(limit ?? 0)
      .skip(offset ?? 0);
  }
}