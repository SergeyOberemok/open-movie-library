export interface BookDto {
  author_name: string[];
  author_key: string[];
  title: string;
  first_publish_year: number;
  language: string[];
}

export class Book implements BookDto {
  author_name: string[];
  author_key: string[];
  title: string;
  first_publish_year: number;
  language: string[];

  public get id(): string {
    return this.title;
  }
}
