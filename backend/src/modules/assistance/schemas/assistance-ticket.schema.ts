import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { ID } from '../../../infrastructure/types.global';
import { TicketMessageDocument } from './ticket-message.schema';

export type AssistanceTicketDocument = HydratedDocument<AssistanceTicket>;

@Schema({
  timestamps: true,
})
export class AssistanceTicket extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  clientId: ID;

  @Prop({ required: false, default: [] })
  messages: TicketMessageDocument[];

  @Prop({ required: false, default: true })
  isOpened: boolean;
}

export const AssistanceTicketSchema = SchemaFactory.createForClass(AssistanceTicket);