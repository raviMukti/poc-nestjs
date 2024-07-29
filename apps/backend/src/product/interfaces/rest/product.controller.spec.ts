import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: CreateProductUseCase,
          useValue: createProductUseCase,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it should create a product
  it('POST /product should create a product', async () => {
    // Fake createProduct To Successfully Create Product
    jest.spyOn(createProductUseCase, 'createProduct').mockImplementation(() => {
      return {
        id: 1,
        name: 'product1',
        description: 'product1 description',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const res = await controller.createProduct();

    expect(res.status).toEqual(201);
    expect(res.body).toEqual({
      "status": 201,
      "message": "Created",
      "data": {
        "id": expect.any(Number),
        "name": expect.any(String),
        "description": expect.any(String),
        "price": expect.any(Number),
        "createdAt": expect.any(String),
        "updatedAt": expect.any(String)
      },
      "error": null,
      "request_id": expect.any(String)
    });
  });

});
