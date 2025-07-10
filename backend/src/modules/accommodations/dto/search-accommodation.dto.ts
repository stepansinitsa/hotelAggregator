import { ID } from '../../../infrastructure/types.global';

export interface SearchAccommodationParamsDto {
  lodgingId: ID;
  name?: any;
  limit?: number;
  offset?: number;
  isActive?: string;
}