import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AddOrderResponse, ChangeStatusOrder, OrderAdd, OrderProduct, OrdersAdmin, OrdersUser } from '../../types';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorators';
import { User } from '../user/user.entity';
import { OrderHeader } from './order-header.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('all-user')
  @UseGuards(AuthGuard('jwt'))
  getAllUser(@UserObj() user: User,):Promise<OrdersUser[]>{
    return this.orderService.getOrderByUser(user);
  }
  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  getAllAdmin():Promise<OrdersAdmin[]>{
    return this.orderService.getOrderByAdmin();
  }
  @Get('all-info/:id')
  @UseGuards(AuthGuard('jwt'))
  getOrderInfo(@Param('id') id: string):Promise<OrderProduct[]>{
    return this.orderService.getOrderInfo(id);
  }

  @Post('change-status')
  @UseGuards(AuthGuard('jwt'))
  changeStatus(
    @Body() change:ChangeStatusOrder,
  ):Promise<OrderHeader>{
    console.log(change);
    return this.orderService.changeStatus(change);
  }

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  addOrder(
    @Body() newOrder:OrderAdd[],
    @UserObj() user: User,
  ):Promise<AddOrderResponse>{
    try {
      return this.orderService.addOrder(newOrder, user);
    }catch (e){
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
