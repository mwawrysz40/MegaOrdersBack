import { UserRoleType } from './user';

export interface UserRecord{
  id: string;
  login: string;
  pass: string;
  token: string | null;
  role: UserRoleType;
  createAt: string;
}