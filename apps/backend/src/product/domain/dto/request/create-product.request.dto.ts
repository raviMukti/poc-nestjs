import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductRequestDto
{
  constructor(name: string, description: string, price: number)
  {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  @IsNotEmpty()
  name: string;
  description: string;
  @IsNumber()
  price: number;
}
