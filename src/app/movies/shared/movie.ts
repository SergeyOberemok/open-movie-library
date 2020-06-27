import { Item } from 'src/app/core/shared';

export interface MovieDto {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export class Movie extends Item implements MovieDto {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;

  public get id(): string {
    return this.imdbID;
  }

  constructor() {
    super('movie');
  }
}
