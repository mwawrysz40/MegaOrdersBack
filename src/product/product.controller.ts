import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductResponse, Product, ProductAdd } from '../../types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';



@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, description: 'The add product' })
  addProduct(
    @Body() newProduct:ProductAdd):Promise<AddProductResponse>{
    return this.productService.addProduct(newProduct);
}

@Get('all-product')
  getProduct():Promise<Product[]>{
    return this.productService.getAllProduct();
}

}
