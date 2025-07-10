import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '../../infrastructure/types.global';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UserProfile } from './schema/user-profile.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserProfile.name) private userModel: Model<UserProfile>,
  ) {}

  async register(dto: UserRegistrationDto): Promise<UserProfile> {
    try {
      const newUser = new this.userModel(dto);
      return newUser.save();
    } catch (error) {
      console.error('[ERROR] Не удалось зарегистрировать пользователя:', error.message);
    }
  }

  async findAll(params: Partial<SearchUserDto>): Promise<UserProfile[]> {
    const { limit, offset, login, fullName, phone } = params;
    const query = {
      login: { $regex: new RegExp(login, 'i') },
      name: { $regex: new RegExp(fullName, 'i') },
      phone: { $regex: new RegExp(phone, 'i') },
    };

    return this.userModel
      .find(query)
      .limit(limit ?? 0)
      .skip(offset ?? 0)
      .select('login fullName phone role');
  }

  async findById(id: ID): Promise<UserProfile> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Некорректный идентификатор пользователя');
    }

    const profile = await this.userModel.findById(id);
    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile;
  }

  async findByLogin(login: string): Promise<UserProfile> | null {
    return await this.userModel.findOne({ login });
  }
  async findByEmail(email: string): Promise<UserProfile | null> {
    return this.userModel.findOne({ login: email }); // или email, в зависимости от схемы
  }
  async updateRole(userId: ID, role: string): Promise<UserProfile> {
    return await this.userModel
      .findByIdAndUpdate({ _id: userId }, { $set: { role } }, { new: true })
      .select('login');
  }
}