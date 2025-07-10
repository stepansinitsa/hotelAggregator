import { ID } from '../../../infrastructure/types.global';

export interface SubmitMessageDto {
  authorId: ID;
  ticketId: ID;
  content: string;
}