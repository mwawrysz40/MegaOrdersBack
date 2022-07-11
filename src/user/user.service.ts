import { HttpException, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { hashPwd } from '../utils/pwd';
import { RegisterUser, RegisterUserResponse, UserRoleType } from 'types/user/user';
import { userInfo } from 'os';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  @Inject(DataSource) private dataSource: DataSource

  async getOneUser(login:string):Promise<User|null>{
    return await User.findOneBy({login:login});
  }

  getRole(user:User):{ role: UserRoleType; id: string,name:string }{
    const {id, role,name} = user;
    return {id, role,name};
  }


  async register(newUser: RegisterUser ): Promise<RegisterUserResponse> {

    const isUser = await this.getOneUser(newUser.login);
    if(isUser){
      throw new HttpException('Podany login już istnieje',402)
    }
    const user = new User();
    user.login = newUser.login;
    user.pass = hashPwd(newUser.pass);
    user.role=newUser.role;
    user.name=newUser.name;
    user.email=newUser.email;
    user.isVIP=newUser.isVIP;
    user.discount=newUser.discount;
    await user.save();
    return user;
  };


}
