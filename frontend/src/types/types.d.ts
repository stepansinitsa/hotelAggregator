export type ID = string;

export interface UserAccountData {
  _id: ID;
  fullName: string;
  email: string;
  role: string;
  phone?: string;
}

export interface LodgingDetails {
  _id: ID;
  name: string;
  description?: string;
  images: string[];
}

export interface AccommodationDetails {
  _id: ID;
  lodgingId: ID;
  title: string;
  description?: string;
  images: string[];
  isEnabled: boolean;
}

export interface BookingData {
  _id: ID;
  userId: ID;
  lodgingId: ID;
  roomId: ID;
  dateStart: Date;
  dateEnd: Date;
}

export interface CreateBookingDto {
  clientId: ID;
  lodgingId: ID;
  roomId: ID;
  checkIn: string;
  checkOut: string;
}

export interface ChatMessage {
  _id: ID;
  author: {
    id: ID;
    name: string;
    role: string;
  };
  content: string;
  ticketId: ID;
  sentAt: Date;
  readAt: Date | null;
}

export interface SupportTicket {
  _id: ID;
  clientId: ID;
  messages: ChatMessage[];
  isActive: boolean;
  createdAt: Date;
}

export interface SocketEvent {
  _id: ID;
  text: string;
  sentAt: string;
  author: {
    id: ID;
    name: string;
  }
}

  export interface UpdateUserRoleDto {
  userId: ID;
  role: string;
}

export interface RegisterUserDto {
  email: string;
  fullName: string;
  password: string;
  phone?: string;
}

export interface SearchLodgingParams {
  limit?: number;
  offset?: number;
  name?: string;
}

export interface SearchAccommodationParams {
  lodgingId?: ID;
  title?: string;
  limit?: number;
  offset?: number;
  isActive?: boolean;
}

export interface CreateSupportTicketDto {
  clientId: ID;
  initialMessage: string;
}

export interface FetchChatListParams {
  clientId: ID | null;
  isActive: boolean;
}

export interface ComposeMessageDto {
  authorId: ID;
  ticketId: ID;
  content: string;
}

export interface MarkMessagesReadDto {
  readerId: ID;
  ticketId: ID;
  beforeDate: Date;
}

export interface UpdateUserRoleDto {
  userId: ID;
  role: string;
}

export interface SearchBookingsDto {
  userId?: ID;
  clientId?: ID;
  lodgingId?: ID;
  roomId?: ID;
  dateStart?: Date | string;
  dateEnd?: Date | string;
  limit?: number;
  offset?: number;
}

export interface Ticket {
  _id: ID;
  clientId: ID;
  messages: ChatMessage[];
  isActive: boolean;
  createdAt: Date;
}
export interface ChatMessage {
  _id: ID;
  author: {
    id: ID;
    name: string;
    role: string;
  };
  content: string;
  ticketId: ID;
  sentAt: Date;
}

export interface Lodging {
  _id: ID;
  name: string;
  description?: string;
  images: string[];
}
