import { Module } from '@nestjs/common';
import { ProductController } from './interfaces/rest/product.controller';

@Module({
  controllers: [ProductController],
  providers: [],
  exports: [],
})
export class ProductModule {}
