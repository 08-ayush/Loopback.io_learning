import { DefaultCrudRepository } from '@loopback/repository';
import { Todo } from '../models';
import { MongodbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(Todo, dataSource);
  }
}
