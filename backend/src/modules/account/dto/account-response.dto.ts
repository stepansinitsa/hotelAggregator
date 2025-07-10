import { ID } from '../../../infrastructure/types.global';

export interface AccountResponseDto {
  token: string;
  role: string;
  id: ID;
}