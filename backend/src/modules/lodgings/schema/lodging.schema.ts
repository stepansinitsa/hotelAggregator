import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LodgingDocument = HydratedDocument<Lodging>;

@Schema({
  timestamps: true,
})
export class Lodging {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];
}

export const LodgingSchema = SchemaFactory.createForClass(Lodging);