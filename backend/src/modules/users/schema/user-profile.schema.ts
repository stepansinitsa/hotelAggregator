import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserProfileDocument = HydratedDocument<UserProfile>;

@Schema()
export class UserProfile extends Document {
  @Prop({
    unique: [true, 'Пользователь с таким логином уже зарегистрирован'],
  })
  login: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  fullName: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ default: 'client' })
  role: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);