import { HttpParams } from '@angular/common/http';

export interface FiltersDto {
  search?: string;
  year?: number;
  type?: string;
  genre?: string;
}

export class Filters implements FiltersDto {
  search?: string;
  year?: number;
  type?: string;
  genre?: string;

  constructor(params?: FiltersDto) {
    Object.assign(this, params);
  }

  public getHttpParams(): HttpParams {
    const httpParams: HttpParams = new HttpParams();

    Object.entries(this).forEach((item: string[]) =>
      httpParams.set(item[0], item[1].toString())
    );

    return httpParams;
  }
}
