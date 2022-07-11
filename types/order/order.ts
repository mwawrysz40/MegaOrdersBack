export enum OrderStatus
{
  NOWY='NOWY',
  PRODUKCJA='PRODUKCJA',
  PAKOWANIE='PAKOWANIE',
  WYSYLKA='WYSYLKA',

}

export interface OrderAdd{
  idProduct:string;
  quantity:number;
}

export interface OrderProduct {
  itemCode:string;
  itemName:string;
  description:string;
  price:number;
  discount:number;
  quantity:number;
  totalPrice:number;
}

export interface OrdersUser {
  id:string,
  status:OrderStatus,
  createAt: string;
}

export interface OrdersAdmin {
  id:string,
  status:OrderStatus,
  createAt: string;
  name:string;
}

export interface AddOrderResponse{
  id:string;
}

export interface ChangeStatusOrder{
  id:string;
  status:OrderStatus;
}