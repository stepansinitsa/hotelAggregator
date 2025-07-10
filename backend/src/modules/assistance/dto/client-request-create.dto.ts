import { ID } from '../../../infrastructure/types.global';

export interface ClientRequestCreate {
  clientId: ID;
  initialMessage: string;
}