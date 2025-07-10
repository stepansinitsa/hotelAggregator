import { ID } from '../../../infrastructure/types.global';

export interface FetchAssistanceListParams {
  clientId: ID | null;
  isActive: boolean;
}