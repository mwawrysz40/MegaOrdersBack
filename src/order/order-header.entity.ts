import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { OrderStatus } from '../../types';
import { OrderLines } from './order-lines.entity';

@Entity()
export class OrderHeader extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type=>User, user=>user.order)
  user:User;

  @Column({
    type: 'date',
    default: () => 'NOW()',
  })
  createAt: string;


  @Column({
    type: 'enum',
    enum:OrderStatus,
    default:OrderStatus.NOWY,
  })
  status:OrderStatus;

@OneToMany(type => OrderLines, lines=>lines.order)
 lines:OrderLines[];


}