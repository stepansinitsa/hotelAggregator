import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { ID } from '../../../infrastructure/types.global';

export type TicketMessageDocument = HydratedDocument<TicketMessage>;

@Schema()
export class TicketMessage extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  authorId: ID;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  sentAt: Date;

  @Prop({ required: false })
  readAt: Date;
}

export const TicketMessageSchema = SchemaFactory.createForClass(TicketMessage);