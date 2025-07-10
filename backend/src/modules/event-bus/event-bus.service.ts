import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class EventBusService {
  public ioServer: Server = null;
}