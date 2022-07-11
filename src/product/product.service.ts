import { HttpException, Injectable } from '@nestjs/common';
import { ProductAdd, AddProductResponse} from '../../types';
import { Product } from './product.entity';

@Injectable()
export class ProductService {


  async getOneProduct(itemCode:string):Promise<Product|null>{
    return await Product.findOneBy({itemCode:itemCode});
  }
  async getOneProductById(id:string):Promise<Product|null>{
    return await Product.findOneBy({id:id});
  }

  async getAllProduct():Promise<Product[]>{
    return await Product.find();
  }

  async addProduct(newProduct:ProductAdd):Promise<AddProductResponse>{

    const isProduct=await this.getOneProduct(newProduct.itemCode);
    if(isProduct){
      throw new HttpException('Podany produkt już istnieje',400);
    }

    const product=new Product();
    product.itemCode=newProduct.itemCode;
    product.itemName=newProduct.itemName;
    product.description=newProduct.description;
    product.quantity=newProduct.quantity;
    product.price=newProduct.price;
    await product.save();
    return product;
  }
}
