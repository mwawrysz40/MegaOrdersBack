import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderHeader } from './order-header.entity';
import { Product } from '../product/product.entity';

@Entity()
export class OrderLines extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(type => OrderHeader, order=>order.lines)
  order:OrderHeader;
  @ManyToOne(type => Product, item=>item.orderLines)
  item:Product;
  @Column()
  quantity:number;
  @Column()
  totalPrice:number;

}