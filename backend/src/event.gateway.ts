import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { EventBusService } from './modules/event-bus/event-bus.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private eventBus: EventBusService) {}

  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger('EventGateway');

  afterInit(server: Server) {
    this.eventBus.ioServer = server;

    this.server.of('/').adapter.on('join-room', (room, id) => {
      this.logger.log(`Клиент ${id} подключился к комнате ${room}`);
    });

    this.server.of('/').adapter.on('leave-room', (room, id) => {
      this.logger.log(`Клиент ${id} покинул комнату ${room}`);
    });
  }

  handleConnection(client: Socket) {
    this.logger.log(`Новое соединение: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Соединение закрыто: ${client.id}`);
  }
}