export interface AddProductResponse{
  id:string;
  itemCode:string;
}

export interface ProductAdd{
  itemCode:string;
  itemName:string;
  description:string;
  quantity:number;
  price:number;
}

export interface Product{
  id:string;
  itemCode:string;
  itemName:string;
  description:string;
  quantity:number;
  price:number;
}