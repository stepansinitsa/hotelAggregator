import { ID } from '../../../infrastructure/types.global';

export interface BookingRequest {
  clientId: ID;
  lodgingId: ID;
  accommodationId: ID;
  checkInDate: Date;
  checkOutDate: Date;
}