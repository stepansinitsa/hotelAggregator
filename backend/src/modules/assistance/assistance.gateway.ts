import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ID } from '../../infrastructure/types.global';
import { UsersService } from '../users/users.service';
import { AssistanceService } from './assistance.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AssistanceGateway {
  constructor(
    private assistanceService: AssistanceService,
    private usersService: UsersService,
  ) {}

  @SubscribeMessage('subscribeToChat')
  async handleSubscription(
    @MessageBody() payload: { chatId: ID },
    @ConnectedSocket() client: Socket,
  ) {
    return this.assistanceService.subscribe(async (ticket, message) => {
      if (ticket._id.toString() === payload.chatId) {
        const { _id, sentAt, content, readAt, authorId } = message;
        const user = await this.usersService.findById(authorId);

        const response = {
          id: _id,
          timestamp: sentAt,
          content,
          readAt,
          author: {
            id: user._id
          },
        };

        client.emit('chatMessage', response);
      }
    });
  }
}