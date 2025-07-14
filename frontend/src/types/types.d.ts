export interface UserPageData {
  _id: string;
  name: string;
  email: string;
  role: string,
  contactPhone?: string;
}

export interface LodgingData {
  _id: string;
  title: string;
  description: string;
  images: string[],
}

export interface LodgingAccomodationData {
  _id: string,
  hotel: string;
  title: string;
  description: string;
  images: string[];
  isEnabled: boolean;
}

export interface AuthentificationData {
  email: string;
  name: string;
  password: string;
  contactPhone?: string;
}

export interface SearchLodgingsDto {
  limit?: number;
  offset?: number;
  title?: string;
}

export interface SearchAccommodationDto {
  hotel: string;
  limit?: number;
  offset?: number;
  title?: string;
  isEnabled?: boolean;
}

export interface SearchUsersDto {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}

export interface AddBookingDto {
  userId: string | null;
  hotelId: string;
  roomId: string;
  dateStart: string;
  dateEnd: string;
}

export interface SearchBookingsDto {
  userId: string;
}

export interface BookingData {
  _id: string;
  userId: { _id: string, email: string };
  hotelId: { _id: string, title: string };
  roomId: { _id: string, title: string };
  dateStart: string,
  dateEnd: string,
}

export interface CreateSupportMessageDto {
  userId: string | null;
  text: string;
}

export interface GetTicketListParams {
  userId: string | null;
  isActive: boolean;
}

export interface SendTicketDto {
  authorId: string;
  supportRequestId: string;
  text: string;
}

export interface MarkMessagesAsReadDto {
  userId: string;
  supportRequestId: string;
  createdBefore: Date;
}

export interface SupportRequestData {
  _id: string;
  userId: UserData;
  messages: MessageData;
  isActive: boolean;
  createdAt: Date;
}

export interface TicketMessageData {
  _id: string;
  authorId: string;
  text: string;
  sentAt: Date;
  readAt: Date;
}

export interface WebSocketDto {
  _id: string;
  text: string;
  sentAt: string;
  author: {
    id: string;
    name: string;
  };
}