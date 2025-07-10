import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ID } from '../../../infrastructure/types.global';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({
  timestamps: true,
})
export class Booking {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  clientId: ID;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Lodgings' })
  lodgingId: ID;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodations',
  })
  accommodationId: ID;

  @Prop({ required: true })
  checkInDate: Date;

  @Prop({ required: true })
  checkOutDate: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);