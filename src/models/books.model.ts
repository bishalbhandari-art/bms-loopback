import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Author} from './authors.model';
import {Category} from './categories.model';

@model({
  settings: {
    postgresql: {
      table: 'books',
    },
  },
})
export class Book extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'number',
    required: true,
  })
  isbn: number;

  @property({
    type: 'date',
  })
  publish_date?: string;

  @property({
    type: 'string',
  })
  book_type?: string;

  @property({
    type: 'number',
  })
  page_count?: number;

  @property({
    type: 'number',
  })
  file_size?: number;

  @belongsTo(
    () => Author,
    {
      name: 'author',
      keyFrom: 'author_id',
      keyTo: 'author_id',
    },
    {
      type: 'number',
      required: true,
    },
  )
  author_id: number;

  @belongsTo(
    () => Category,
    {
      name: 'category',
      keyFrom: 'category_id',
      keyTo: 'category_id',
    },
    {
      type: 'number',
      required: true,
    },
  )
  category_id: number;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  author?: Author;
  category?: Category;
}

export type BookWithRelations = Book & BookRelations;
