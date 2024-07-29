import { Product } from "../product.entity";

export class ProductEntityBuilder
{
  private product: Product;

  constructor(product: Product)
  {
    this.product = product;
  }

  public setName(name: string): ProductEntityBuilder
  {
    this.product.name = name;
    return this;
  }

  public setDescription(description: string): ProductEntityBuilder
  {
    this.product.description = description;
    return this;
  }

  public setPrice(price: number): ProductEntityBuilder
  {
    this.product.price = price;
    return this;
  }

  public build(): Product
  {
    return this.product;
  }
}
