
import { CreateProductRequestDto } from '../create-product.request.dto';
import { CreateProductRequestDtoBuilder } from './create-product.request.dto.builder';

describe("CreateProductRequestDtoBuilder", () => {
  it("should create a new CreateProductRequestDto", () => {

    const dto = new CreateProductRequestDtoBuilder()
                      .setName("Product ABC")
                      .setDescription("Lorem ipsum dolor sit amet")
                      .setPrice(100)
                      .build();

    expect(dto).toBeInstanceOf(CreateProductRequestDto);
    expect(dto.name).toBe("Product ABC");
    expect(dto.description).toBe("Lorem ipsum dolor sit amet");
    expect(dto.price).toBe(100);
  });
});
