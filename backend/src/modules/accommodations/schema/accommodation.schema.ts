import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AccommodationDocument = HydratedDocument<Accommodation>;

@Schema({
  timestamps: true,
})
export class Accommodation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lodging', required: true })
  lodging: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ required: true })
  isActive: boolean;
}

export const AccommodationSchema = SchemaFactory.createForClass(Accommodation);