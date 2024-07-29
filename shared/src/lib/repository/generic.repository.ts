/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from "@nestjs/typeorm";
import { IRepository } from "./repository.interface";
import { FindManyOptions, DeepPartial, Repository, ObjectLiteral, EntitySchema, UpdateResult, DeleteResult, FindOptionsWhere } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class GenericRepository<T extends ObjectLiteral> implements IRepository<T> {

  constructor(
    @InjectRepository(EntitySchema)
    private readonly repository: Repository<T>,
  ) {}

  findAll(options?: FindManyOptions<T> | undefined): Promise<T[]>
  {
    return this.repository.find(options);
  }

  findById(id: number): Promise<T | null>
  {
    return this.repository.findOneById(id);
  }

  create(data: DeepPartial<T>): Promise<T>
  {
    return this.repository.save(data);
  }

  update(id: number, data: QueryDeepPartialEntity<T>): Promise<UpdateResult>
  {
    return this.repository.update(id, data);
  }

  delete(id: number): Promise<DeleteResult>
  {
    return this.repository.delete(id);
  }

  async whereByCriteria(criteria: any[], joins: any[] = [], attributes: string[] = ['*'], isSort = false, sortField = 'created_at', sort: 'ASC' | 'DESC' = 'ASC'): Promise<T[]> {
    let query = this.repository.createQueryBuilder('entity');

    if (criteria && criteria.length) {
      criteria.forEach(([column, operator, value, boolean = 'and']) => {
        if (boolean === 'or') {
          query = query.orWhere(`${column} ${operator} :value`, { value });
        } else {
          query = query.andWhere(`${column} ${operator} :value`, { value });
        }
      });
    }

    if (joins && joins.length) {
      joins.forEach(([table, firstColumn, operator, secondColumn, joinType = 'inner']) => {
        if (joinType === 'inner') {
          query = query.innerJoin(`entity.${table}`, table, `${table}.${firstColumn} ${operator} ${secondColumn}`);
        } else if (joinType === 'left') {
          query = query.leftJoin(`entity.${table}`, table, `${table}.${firstColumn} ${operator} ${secondColumn}`);
        }
      });
    }

    if (attributes && attributes.length) {
      query = query.select(attributes.map(attr => `entity.${attr}`));
    }

    if (isSort) {
      query = query.orderBy(`entity.${sortField}`, sort);
    }

    return query.getMany();
  }

  increment(id: number, field: keyof T, amount: number): Promise<UpdateResult>
  {
    return this.repository.increment({ id: id } as unknown as FindOptionsWhere<T>, field as string, amount);
  }

  decrement(id: number, field: keyof T, amount: number): Promise<UpdateResult>
  {
    return this.repository.decrement({ id: id } as unknown as FindOptionsWhere<T>, field as string, amount);
  }

}
