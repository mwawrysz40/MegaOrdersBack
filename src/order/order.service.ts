import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  AddOrderResponse,
  ChangeStatusOrder,
  OrderAdd,
  OrderProduct,
  OrdersAdmin,
  OrderStatus,
  OrdersUser,
} from '../../types';
import { ProductService } from '../product/product.service';
import { OrderHeader } from './order-header.entity';
import { OrderLines } from './order-lines.entity';
import { User } from '../user/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class OrderService {
  @Inject(DataSource) private dataSource: DataSource;

  constructor(
    @Inject(ProductService) private productService: ProductService,
  ) {
  }

  async getAllOrder(): Promise<OrderHeader[]> {
    return OrderHeader.find();
  }

  async getOrderById(id:string):Promise<OrderHeader>{
    return OrderHeader.findOneBy({id:id});
  }

  async getOrderByUser(user: User): Promise<OrdersUser[]> {
    const result = await this.dataSource

      .createQueryBuilder(OrderHeader, 't1')
      .select('t1.id', 'id')
      .addSelect(`t1.status`, 'status')
      .addSelect('t1. createAt', 'createAt')
      .leftJoin('User', 't2', 't1.userId=t2.id')
      .where('t1.userId=:id', { id: user.id })
      .orderBy('t1. createAt','DESC')
      .getRawMany();
    return result;
  }

  async getOrderInfo(id:string):Promise<OrderProduct[]>{
    const result=await this.dataSource

      .createQueryBuilder(OrderHeader,'t0')
      .select('t2.itemCode','itemCode')
      .addSelect('t2.itemName','itemName')
      .addSelect('t2.description','description')
      .addSelect('t2.price','price')
      .addSelect('t3.discount','discount')
      .addSelect('t1.quantity','quantity')
      .addSelect('t1.totalPrice','totalPrice')
      .leftJoin('OrderLines','t1','t0.id=t1.orderId')
      .leftJoin('Product','t2','t1.itemId=t2.id')
      .leftJoin('User','t3','t0.userId=t3.id')
      .where('t0.Id=:id',{id:id})
      .getRawMany();
      return result;

  }



  async getOrderByAdmin(): Promise<OrdersAdmin[]> {
    const result = await this.dataSource

      .createQueryBuilder(OrderHeader, 't1')
      .select('t1.id', 'id')
      .addSelect('t2. name', 'name')
      .addSelect(`t1.status`, 'status')
      .addSelect('t1. createAt', 'createAt')
      .leftJoin('User', 't2', 't1.userId=t2.id')
      .getRawMany();
    return result;
  }

  async changeStatus(change:ChangeStatusOrder):Promise<OrderHeader>{
    const order=await OrderHeader.findOneBy({id:change.id});
    order.status=change.status;
    await order.save();
    return order;
  }


  async addOrder(newOrder: OrderAdd[], user: User): Promise<AddOrderResponse> {
    const order = new OrderHeader();
    order.user = user;
    await order.save();
    for (const item of newOrder) {
      const product = await this.productService.getOneProductById(item.idProduct);
      if (item.quantity > product.quantity) {
        throw new HttpException('Brak ilości na magazynie', 403);
      }
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(OrderLines)
        .values({
          item: product,
          order: order,
          quantity: item.quantity,
          totalPrice:user.isVIP==='TAK'? item.quantity * (product.price-((product.price*user.discount)/100)):item.quantity*product.price,
        })
        .execute();
      product.quantity = product.quantity - item.quantity;
      await product.save();
    }
    return order;
  }
}
