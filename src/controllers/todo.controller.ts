// import {
//   Count,
//   CountSchema,
//   Filter,
//   FilterExcludingWhere,
//   repository,
//   Where,
// } from '@loopback/repository';
// import {
//   del,
//   get,
//   getModelSchemaRef,
//   param,
//   patch,
//   post,
//   put,
//   requestBody,
//   response,
// } from '@loopback/rest';
// import {Todo} from '../models';
// import {TodoRepository} from '../repositories/todo.repository';

// export class TodoController {
//   constructor(
//     @repository(TodoRepository)
//     public todoRepository: TodoRepository,
//   ) {}

//   @post('/todos')
//   @response(200, {
//     description: 'Todo model instance',
//     content: {'application/json': {schema: getModelSchemaRef(Todo)}},
//   })
//   async create(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Todo, {
//             title: 'NewTodo',
//             exclude: ['id'],
//           }),
//         },
//       },
//     })
//     todo: Omit<Todo, 'id'>,
//   ): Promise<Todo> {
//     return this.todoRepository.create(todo);
//   }

//   @get('/todos/count')
//   @response(200, {
//     description: 'Todo model count',
//     content: {'application/json': {schema: CountSchema}},
//   })
//   async count(@param.where(Todo) where?: Where<Todo>): Promise<Count> {
//     return this.todoRepository.count(where);
//   }

//   @get('/todos')
//   @response(200, {
//     description: 'Array of Todo model instances',
//     content: {
//       'application/json': {
//         schema: {
//           type: 'array',
//           items: getModelSchemaRef(Todo, {includeRelations: true}),
//         },
//       },
//     },
//   })
//   async find(@param.filter(Todo) filter?: Filter<Todo>): Promise<Todo[]> {
//     return this.todoRepository.find(filter);
//   }

//   @patch('/todos')
//   @response(200, {
//     description: 'Todo PATCH success count',
//     content: {'application/json': {schema: CountSchema}},
//   })
//   async updateAll(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Todo, {partial: true}),
//         },
//       },
//     })
//     todo: Todo,
//     @param.where(Todo) where?: Where<Todo>,
//   ): Promise<Count> {
//     return this.todoRepository.updateAll(todo, where);
//   }

//   @get('/todos/{id}')
//   @response(200, {
//     description: 'Todo model instance',
//     content: {
//       'application/json': {
//         schema: getModelSchemaRef(Todo, {includeRelations: true}),
//       },
//     },
//   })
//   async findById(
//     @param.path.number('id') id: number,
//     @param.filter(Todo, {exclude: 'where'}) filter?: FilterExcludingWhere<Todo>,
//   ): Promise<Todo> {
//     return this.todoRepository.findById(id, filter);
//   }

//   @patch('/todos/{id}')
//   @response(204, {
//     description: 'Todo PATCH success',
//   })
//   async updateById(
//     @param.path.number('id') id: number,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Todo, {partial: true}),
//         },
//       },
//     })
//     todo: Todo,
//   ): Promise<void> {
//     await this.todoRepository.updateById(id, todo);
//   }

//   @put('/todos/{id}')
//   @response(204, {
//     description: 'Todo PUT success',
//   })
//   async replaceById(
//     @param.path.number('id') id: number,
//     @requestBody() todo: Todo,
//   ): Promise<void> {
//     await this.todoRepository.replaceById(id, todo);
//   }

//   @del('/todos/{id}')
//   @response(204, {
//     description: 'Todo DELETE success',
//   })
//   async deleteById(@param.path.number('id') id: number): Promise<void> {
//     await this.todoRepository.deleteById(id);
//   }
// }

import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {MongodbDataSource} from '../datasources/mongod.datasource';
import {Todo} from '../models';
import {TodoRepository} from '../repositories/todo.repository';

export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
    // Inject the data source to access MongoDB client
    @inject('datasources.mongodb') private mongoDataSource: MongodbDataSource,
  ) {}

  @post('/todos')
  @response(200, {
    description: 'Todo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {
            title: 'NewTodo',
            exclude: ['id'],
          }),
        },
      },
    })
    todo: Omit<Todo, 'id'>,
  ): Promise<Todo> {
    return this.todoRepository.create(todo);
  }

  @get('/todos/count')
  @response(200, {
    description: 'Todo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Todo) where?: Where<Todo>): Promise<Count> {
    return this.todoRepository.count(where);
  }

  @get('/todos')
  @response(200, {
    description: 'Array of Todo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todo, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Todo) filter?: Filter<Todo>): Promise<Todo[]> {
    return this.todoRepository.find(filter);
  }

  @patch('/todos')
  @response(200, {
    description: 'Todo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {partial: true}),
        },
      },
    })
    todo: Todo,
    @param.where(Todo) where?: Where<Todo>,
  ): Promise<Count> {
    return this.todoRepository.updateAll(todo, where);
  }

  @get('/todos/{id}')
  @response(200, {
    description: 'Todo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Todo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Todo, {exclude: 'where'}) filter?: FilterExcludingWhere<Todo>,
  ): Promise<Todo> {
    return this.todoRepository.findById(id, filter);
  }

  @patch('/todos/{id}')
  @response(204, {
    description: 'Todo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {partial: true}),
        },
      },
    })
    todo: Todo,
  ): Promise<void> {
    await this.todoRepository.updateById(id, todo);
  }

  @put('/todos/{id}')
  @response(204, {
    description: 'Todo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todo: Todo,
  ): Promise<void> {
    await this.todoRepository.replaceById(id, todo);
  }

  @del('/todos/{id}')
  @response(204, {
    description: 'Todo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoRepository.deleteById(id);
  }

  @get('/todos/search')
  @response(200, {
    description: 'Array of Todo model instances matching search criteria',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todo, {includeRelations: true}),
        },
      },
    },
  })
  async search(
    @param.query.string('title') title?: string,
    @param.query.string('desc') desc?: string,
    @param.query.boolean('isComplete') isComplete?: boolean,
    @param.query.number('page') page: number = 0,
    @param.query.number('count') count: number = 10,
  ): Promise<Todo[]> {
    const pipeline: Array<Record<string, unknown>> = [];

    // Build the match stage based on query parameters
    const matchStage: Record<string, unknown> = {};
    if (title) {
      matchStage.title = {$regex: title, $options: 'i'}; // Case-insensitive regex
    }
    if (desc) {
      matchStage.desc = {$regex: desc, $options: 'i'}; // Case-insensitive regex
    }
    if (isComplete !== undefined) {
      matchStage.isComplete = isComplete;
    }

    // Only add the $match stage if there are conditions to match
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({$match: matchStage, $skip: page * count, $limit: count});
    }

    // Use the MongoDB collection to perform aggregation
    if (!this.mongoDataSource.connector) {
      throw new Error('MongoDB  is not initialized');
    }
    const todos = await this.mongoDataSource.connector
      .collection('Todo')
      .aggregate(pipeline)
      .toArray();

    return todos;
  }
}
