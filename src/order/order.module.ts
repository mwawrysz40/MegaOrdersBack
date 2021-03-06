import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    forwardRef(() => ProductModule)
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
