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


// import { DefaultCrudRepository } from '@loopback/repository';
// import { Todo } from '../models';
// import { MongodbDataSource } from '../datasources';
// import { inject } from '@loopback/core';
// import { MongoClient } from 'mongodb';

// export class TodoRepository extends DefaultCrudRepository<
//   Todo,
//   typeof Todo.prototype.id
// > {
//   constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
//     super(Todo, dataSource);
//   }

//   async searchTodos(searchTerm: string): Promise<Todo[]> {
//     try {
//       const client = await this.dataSource.getMongoClient(); // Get the MongoDB client
//       const db = client.db(); // Get the database
//       const collection = db.collection('todo'); // Access the 'todo' collection

//       const results = await collection.aggregate([
//         {
//           $match: {
//             $or: [
//               { title: { $regex: searchTerm, $options: 'i' } },
//               { desc: { $regex: searchTerm, $options: 'i' } }
//             ]
//           }
//         }
//       ]).toArray(); // Convert cursor to array

//       return results; // Return the results
//     } catch (error) {
//       console.error('Error during searchTodos:', error); // Log the error
//       throw error; // Re-throw the error to be handled by the controller
//     }
//   }
// }
