import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })

export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type:"string",
  })
  desc?: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  [prop: string]: any;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}
