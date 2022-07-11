export enum UserRoleType
{
  ADMIN = 'admin',
  USER = 'user',
}

export interface RegisterUserResponse {
  id: string;
  login: string;
}
export interface LoginUser {
  login: string;
  pass:string;
}

export interface RegisterUser {
  login:string;
  pass: string;
  role: UserRoleType;
  name:string;
  email: string;
  isVIP: string;
  discount: number;
}

export interface UserRole {
  id: string;
  role: UserRoleType;
  name:string;
}