/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../../domain/repository/product.repository";
import { Product } from "../../domain/entities/product.entity";

@Injectable()
export class ProductService
{
  constructor(
    private readonly productRepository: ProductRepository
  ){}

  async createProduct(product: any): Promise<Product>
  {
    return await this.productRepository.create(product);
  }
}
