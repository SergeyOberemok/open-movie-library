export interface MovieDto {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export class Movie implements MovieDto {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
