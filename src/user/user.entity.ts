import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleType } from '../../types/user/user';
import { OrderHeader } from '../order/order-header.entity';



@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20,
  })
  login: string;

  @Column()
  pass: string;

  @Column({
    nullable: true,
    default: null,
  })
  token: string | null;

  @Column({
    type: 'enum',
    enum: UserRoleType,
    default: UserRoleType.USER,
  })
  role: UserRoleType;

  @Column({
    type: 'date',
    default: () => 'NOW()',
  })
  createAt: string;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    length: 255,
  })
  email: string;

  @Column({
    type: 'float',
    precision: 4,
    scale: 2,
  })
  discount: number;

  @Column({
    length: 3,
  })
  isVIP: string;


  @OneToMany(type=>OrderHeader, order=>order.user)
  order:OrderHeader[];

}
