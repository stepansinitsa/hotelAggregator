export interface SearchUserDto {
  limit: number;
  offset: number;
  login: string;
  fullName: string;
  phone: string;
}