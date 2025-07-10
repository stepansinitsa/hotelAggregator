import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AllowedRoles } from '../../decorators/allowed-roles.decorator';
import { TokenAuthGuard } from '../../guard/token-auth.guard';
import { RoleBasedGuard } from '../../guard/role-based.guard';
import { ID } from '../../infrastructure/types.global';
import { ClientRequestCreate } from './dto/client-request-create.dto';
import { FetchAssistanceListParams } from './dto/fetch-assistance-list.dto';
import { MarkMessagesAsReadDto } from './dto/read-messages.dto';
import { SubmitMessageDto } from './dto/submit-message.dto';
import { TicketMessage } from './schemas/ticket-message.schema';
import { AssistanceTicket } from './schemas/assistance-ticket.schema';
import { ClientAssistanceService } from './client-assistance.service';
import { EmployeeAssistanceService } from './employee-assistance.service';
import { AssistanceService } from './assistance.service';

@UseGuards(TokenAuthGuard, RoleBasedGuard)
@Controller('api/assistance')
export class AssistanceController {
  constructor(
    private assistanceService: AssistanceService,
    private clientService: ClientAssistanceService,
    private employeeService: EmployeeAssistanceService,
  ) {}

  @AllowedRoles('client')
  @Post()
  async openNewRequest(@Body() data: ClientRequestCreate) {
    const ticket = await this.clientService.startClientAssistance(data);

    await this.assistanceService.postNewMessage({
      authorId: data.clientId,
      ticketId: ticket.id,
      content: data.initialMessage,
    });

    const unread = await this.clientService.getUnreadCount(ticket.id);

    return {
      id: ticket.id,
      isOpened: ticket.isOpened,
      hasNewMessages: unread.length > 0,
    };
  }

  @AllowedRoles('client', 'manager', 'admin')
  @Get()
  fetchTickets(@Query() filters: FetchAssistanceListParams): Promise<AssistanceTicket[]> {
    return this.assistanceService.findTickets(filters);
  }

  @AllowedRoles('client', 'manager', 'admin')
  @Post('/sendmessage')
  postNewMessage(@Body() messageData: SubmitMessageDto): Promise<TicketMessage> {
    return this.assistanceService.postNewMessage(messageData);
  }

  @AllowedRoles('client', 'manager', 'admin')
  @Get('/messages/:id')
  getMessages(
    @Param('id') ticketId: ID,
    @Query() { userId }: { userId: ID },
  ): Promise<TicketMessage[]> {
    return this.assistanceService.fetchMessages(ticketId, userId);
  }

  @AllowedRoles('client', 'manager', 'admin')
  @Post('/readmessages')
  markAsRead(
    @Body() data: MarkMessagesAsReadDto,
    @Request() req: any,
  ) {
    if (req.user?.role === 'client') {
      this.clientService.markMessagesAsRead(data);
    } else if (
      req.user?.role === 'manager' ||
      req.user?.role === 'admin'
    ) {
      this.employeeService.markMessagesAsRead(data);
    }
  }

  @AllowedRoles('manager', 'admin')
  @Post('/close/:id')
  async closeTicket(@Param('id') ticketId: ID) {
    await this.employeeService.resolveTicket(ticketId);
  }
}