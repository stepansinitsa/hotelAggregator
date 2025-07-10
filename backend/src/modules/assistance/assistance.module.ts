import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { TicketMessage, TicketMessageSchema } from './schemas/ticket-message.schema';
import { AssistanceTicket, AssistanceTicketSchema } from './schemas/assistance-ticket.schema';
import { ClientAssistanceService } from './client-assistance.service';
import { EmployeeAssistanceService } from './employee-assistance.service';
import { AssistanceController } from './assistance.controller';
import { AssistanceService } from './assistance.service';
import { AssistanceGateway } from './assistance.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssistanceTicket.name, schema: AssistanceTicketSchema },
      { name: TicketMessage.name, schema: TicketMessageSchema },
    ]),
    UsersModule,
  ],
  controllers: [AssistanceController],
  providers: [
    AssistanceService,
    ClientAssistanceService,
    EmployeeAssistanceService,
    AssistanceGateway,
  ],
})
export class AssistanceModule {}