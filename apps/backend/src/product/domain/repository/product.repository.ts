import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { GenericRepository } from "@wms-monorepo/shared";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductRepository extends GenericRepository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {
    super(productRepository);
  }
}
