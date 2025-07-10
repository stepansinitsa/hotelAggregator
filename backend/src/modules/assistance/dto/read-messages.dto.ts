import { ID } from '../../../infrastructure/types.global';

export interface MarkMessagesAsReadDto {
  readerId: ID;
  ticketId: ID;
  beforeDate: Date;
}