import { apiRequest } from "./api-request";
import {
  RegisterUserDto,
  SearchLodgingParams,
  SearchAccommodationParams,
  UpdateUserRoleDto,
  CreateBookingDto,
  CreateSupportTicketDto,
  FetchChatListParams,
  ComposeMessageDto,
  MarkMessagesReadDto
} from "../types/types.d";

export const accountApi = {
  login: async (credentials: { email: string; password: string }) => {
    return apiRequest("account/login", "POST", credentials);
  },
  register: async (userData: RegisterUserDto) => {
    return apiRequest("account/register", "POST", userData);
  },
  fetchProfile: async (email: string) => {
    return apiRequest("account/profile", "GET", undefined, { email });
  }
};

export const lodgingApi = {
  search: async (filters: SearchLodgingParams) => {
    return apiRequest("lodgings", "GET", undefined, filters);
  },
  getById: async (id: string) => {
    return apiRequest(`lodgings/${id}`, "GET");
  },
  create: async (data: FormData) => {
    return apiRequest("lodgings", "POST", data, undefined, true);
  },
  update: async (id: string, data: FormData) => {
    return apiRequest(`lodgings/${id}`, "PUT", data, undefined, true);
  }
};

export const accommodationApi = {
  search: async (filters: SearchAccommodationParams) => {
    return apiRequest("accommodations", "GET", undefined, filters);
  },
  create: async (data: FormData) => {
    return apiRequest("accommodations", "POST", data, undefined, true);
  },
  update: async (id: string, data: FormData) => {
    return apiRequest(`accommodations/${id}`, "PUT", data, undefined, true);
  }
};

export const bookingApi = {
  create: async (bookingData: CreateBookingDto) => {
    return apiRequest("bookings", "POST", bookingData);
  },
  getByUser: async (userId: string) => {
    return apiRequest(`bookings?userId=${userId}`, "GET");
  },
  cancel: async (bookingId: string, userId: string) => {
    return apiRequest(`bookings/${bookingId}`, "DELETE", { userId });
  }
};

export const assistanceApi = {
  openTicket: async (ticketData: CreateSupportTicketDto) => {
    return apiRequest("assistance/ticket", "POST", ticketData);
  },
  getTickets: async (filters: FetchChatListParams) => {
    return apiRequest("assistance/tickets", "GET", undefined, filters);
  },
  sendMessage: async (messageData: ComposeMessageDto) => {
    return apiRequest("assistance/send", "POST", messageData);
  },
  loadMessages: async (ticketId: string, userId: string) => {
    return apiRequest(`assistance/messages/${ticketId}`, "GET", undefined, { userId });
  },
  markAsRead: async (readData: MarkMessagesReadDto) => {
    return apiRequest("assistance/read", "POST", readData);
  },
  closeTicket: async (ticketId: string) => {
    return apiRequest(`assistance/close/${ticketId}`, "POST");
  }
};

export const userAccountApi = {
  updateUserRole: async (payload: UpdateUserRoleDto) => {
    return apiRequest(`accounts/${payload.userId}`, "PUT", { role: payload.role });
  }
};