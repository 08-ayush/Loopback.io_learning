import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

// const config = {
//   name: 'mongodb',
//   connector: 'mongodb',
//   url: 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority',
//   host: '',
//   port: 0,
//   user: '',
//   password: '',
//   database: '',
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://aayushchauhan008:MVwbEsoEJ7Rkngxl@cluster0.7s7ei.mongodb.net/mydb', // Replace 'mydb' with your actual database name
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
