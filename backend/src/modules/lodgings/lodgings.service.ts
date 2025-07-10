import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '../../infrastructure/types.global';
import { LodgingCreateDto } from './dto/lodging-create.dto';
import { SearchLodgingParamsDto } from './dto/search-lodging.dto';
import { UpdateLodgingDto } from './dto/update-lodging.dto';
import { Lodging } from './schema/lodging.schema';

@Injectable()
export class LodgingsService {
  constructor(
    @InjectModel(Lodging.name) private model: Model<Lodging>,
  ) {}

  async add(data: LodgingCreateDto): Promise<Lodging> {
    try {
      const record = new this.model(data);
      return await record.save();
    } catch (error) {
      console.error('[ERROR] Не удалось добавить объект размещения:', error.message);
    }
  }

  async modify(
    id: ID,
    updates: UpdateLodgingDto,
  ): Promise<Lodging> {
    return await this.model.findByIdAndUpdate(
      { _id: id },
      { $set: { ...updates } },
      { new: true },
    );
  }

  async fetchById(id: ID): Promise<Lodging> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Указан некорректный идентификатор');
    }

    const record = await this.model.findById(id);
    if (!record) {
      throw new NotFoundException('Объект размещения не найден');
    }

    return record;
  }

  async find(params: SearchLodgingParamsDto): Promise<Lodging[]> {
    const { limit, offset, name } = params;
    const query = {
      name: { $regex: new RegExp(name, 'i') },
    };

    return await this.model
      .find(query)
      .limit(limit ?? 0)
      .skip(offset ?? 0)
      .select('name description images');
  }
}