import { Body, Controller, Get, HttpException, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterUserResponse, UserRoleType } from '../../types/user/user';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorators';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('register')
  register(
    @Body() newUser: RegisterDto): Promise<RegisterUserResponse> {
    return this.userService.register(newUser);
  }

  @Get('user-rola')
  @UseGuards(AuthGuard('jwt'))
  userRola(
    @UserObj() user: User):{ role: UserRoleType; id: string;name:string }
  {
    return this.userService.getRole(user);

  }

}






