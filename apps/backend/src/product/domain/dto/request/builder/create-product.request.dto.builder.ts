import { CreateProductRequestDto } from "../create-product.request.dto";

export class CreateProductRequestDtoBuilder
{
  private name: string;
  private description: string;
  private price: number;

  public setName(name: string): CreateProductRequestDtoBuilder
  {
    this.name = name;
    return this;
  }

  public setDescription(description: string): CreateProductRequestDtoBuilder
  {
    this.description = description;
    return this;
  }

  public setPrice(price: number): CreateProductRequestDtoBuilder
  {
    this.price = price;
    return this;
  }

  public build(): CreateProductRequestDto
  {
    return new CreateProductRequestDto(this.name, this.description, this.price);
  }
}
