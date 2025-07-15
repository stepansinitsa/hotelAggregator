import fetchData from "./api-request";

import {
  AuthentificationData,
  SearchLodgingsDto,
  SearchAccommodationDto,
  SearchUsersDto,
  AddBookingDto,
  CreateSupportMessageDto,
  GetTicketListParams,
  SearchBookingsDto,
  SendTicketDto,
  MarkMessagesAsReadDto,
} from "../types/types.d";

export default function useFetchData() {
  const usersApi = {
    search(searchParams: Partial<SearchUsersDto>) {
      const result = fetchData("users", { method: "GET", params: searchParams });
      return result;
    },
    updateRole(id: string, role: string) {
      const result = fetchData(`users/${id}`, { method: "PUT", data: { role } });
      return result;
    },
  };

  const authUser = {
    login(email: string, password: string) {
      const result = fetchData("api/auth/signin", { method: "POST", data: { email, password } });
      return result;
    },
    register(data: AuthentificationData) {
      const result = fetchData("api/auth/signup", { method: "POST", data });
      return result;
    },
    getInfo(email: string) {
      const result = fetchData("api/auth/checkauth", { method: "GET", params: { email } });
      return result;
    },
  };

  const hotelsAPI = {
    search(searchParams: SearchLodgingsDto) {
      const result = fetchData("lodgings", { method: "GET", params: searchParams });
      return result;
    },
    findById(id: string) {
      const result = fetchData(`lodgings/findlodging/${id}`, { method: "GET" });
      return result;
    },
    addHotel(data: FormData) {
      const result = fetchData("lodgings", { method: "POST", data }, true);
      return result;
    },
    updateHotel(data: FormData, id: string) {
      const result = fetchData(`lodgings/${id}`, { method: "PUT", data }, true);
      return result;
    },
  };

  const roomsApi = {
    search(searchParams: SearchAccommodationDto) {
      const result = fetchData("accommodations", { method: "GET", params: searchParams });
      return result;
    },
    addRoom(data: FormData) {
      const result = fetchData("accommodations", { method: "POST", data }, true);
      return result;
    },
    updateRoom(data: FormData, id: string) {
      const result = fetchData(`accommodations/${id}`, { method: "PUT", data }, true);
      return result;
    },
  };

  const reservationsApi = {
    search(searchParams: SearchBookingsDto) {
      const result = fetchData("bookings", { method: "GET", params: searchParams });
      return result;
    },
    addReservation(data: AddBookingDto) {
      const result = fetchData("bookings", { method: "POST", data });
      return result;
    },
    removeReservation(reservationId: string, userId: string | null) {
      const result = fetchData(`bookings/${reservationId}`, { method: "DELETE", data: { userId } });
      return result;
    },
  };

  const supportRequestApi = {
    createRequest(data: CreateSupportMessageDto) {
      const result = fetchData("support", { method: "POST", data });
      return result;
    },
    findRequests(searchParams: GetTicketListParams) {
      const result = fetchData("support", { method: "GET", params: searchParams });
      return result;
    },
    sendMessage(data: SendTicketDto) {
      const result = fetchData("support/sendticket", { method: "POST", data });
      return result;
    },
    getMessages(supportRequestId: string, userId: string) {
      const result = fetchData(`support/getticket/${supportRequestId}`, { method: "GET", params: { userId } });
      return result;
    },
    readMessages(data: MarkMessagesAsReadDto) {
      const result = fetchData("support/readticket", { method: "POST", data });
      return result;
    },
    closeRequest(supportRequestId: string) {
      const result = fetchData(`support/closerequest/${supportRequestId}`, { method: "POST" });
      return result;
    },
  };

  return {
    usersApi,
    authUser,
    hotelsAPI,
    roomsApi,
    reservationsApi,
    supportRequestApi,
  };
}