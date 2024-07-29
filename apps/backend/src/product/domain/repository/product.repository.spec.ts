/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../entities/product.entity';
import { ProductRepository } from './product.repository';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
describe("ProductRepository", () => {

  const mockRepository = {
    find: jest.fn(),
    findOneById: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    })),
    increment: jest.fn(),
    decrement: jest.fn(),
  };

  let repository: Repository<Product>;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "mysql",
          host: "localhost",
          port: 3307,
          username: "wms_poc",
          password: "wms_poc",
          database: "wms_poc",
        }),
        TypeOrmModule.forFeature([Product]),
      ],
      providers: [
        {
          provide: 'Repository<Product>',
          useValue: mockRepository,
        },
        {
          provide: ProductRepository,
          useFactory: (repo: Repository<Product>) => new ProductRepository(repo),
          inject: ['Repository<Product>'],
        },
      ],
    }).compile();

    repository = module.get<Repository<Product>>('Repository<Product>');
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(productRepository).toBeDefined();
  });

  it("create should save a product to the database", async () => {

    const product = new Product();
    product.name = "Product ABC";
    product.description = "Lorem ipsum dolor sit amet";
    product.price = 100;

    await productRepository.create(product);

    const products = await productRepository.findAll();

    expect(products).toHaveLength(1);
    expect(products[0].name).toBe("Product ABC");
    expect(products[0].description).toBe("Lorem ipsum dolor sit amet");
    expect(products[0].price).toBe(100);
  });
});
