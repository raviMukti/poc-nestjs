/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeepPartial, DeleteResult, FindManyOptions, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IRepository<T>{
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: DeepPartial<T>): Promise<T>;
  update(id: number, data: QueryDeepPartialEntity<T>): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
  whereByCriteria(criteria: any[], joins?: any[], attributes?: string[], isSort?: boolean, sortField?: string, sortOrder?: string): Promise<T[]>;
  increment(id: number, field: keyof T, amount: number): Promise<UpdateResult>;
  decrement(id: number, field: keyof T, amount: number): Promise<UpdateResult>;
}
