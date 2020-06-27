import { Item } from 'src/app/core/shared';

export interface BookDto {
  author_name: string[];
  author_key: string[];
  title: string;
  first_publish_year: number;
  language: string[];
}

export class Book extends Item implements BookDto {
  author_name: string[];
  author_key: string[];
  title: string;
  first_publish_year: number;
  language: string[];

  public get id(): string {
    return this.title;
  }

  constructor() {
    super('book');
  }
}
