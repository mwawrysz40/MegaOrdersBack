import { UserRoleType } from "types/user/user";


export class RegisterDto {
  login:string;
  pass: string;
  role: UserRoleType;
  name:string;
  email: string;
  isVIP: string;
  discount: number;
}