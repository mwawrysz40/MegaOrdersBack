import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderLines } from '../order/order-lines.entity';

@Entity()
export class Product extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length:15})
  itemCode:string;

  @Column({length:25})
  itemName:string;

  @Column({length:200})
  description:string;

  @Column()
  quantity:number;

  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  price:number;

  @OneToMany(type => OrderLines, orderLines=>orderLines.item)
  orderLines:OrderLines[];

}