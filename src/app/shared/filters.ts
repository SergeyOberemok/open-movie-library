import { HttpParams } from '@angular/common/http';
import { NameValuePair } from './name-value-pair';

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

  public getHttpParams(additionalParams: [string, string][] = []): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    Object.entries(this).forEach(
      (item: string[]) =>
        (httpParams = httpParams.set(item[0], item[1].toString()))
    );

    if (additionalParams && additionalParams.length > 0) {
      additionalParams.forEach(
        (item: string[]) =>
          (httpParams = httpParams.set(item[0], item[1].toString()))
      );
    }

    return httpParams;
  }

  public toKeyValue(): NameValuePair<string | number>[] {
    return Object.entries(this).map((entry: [string, string | number]) => ({
      name: entry[0],
      value: entry[1]
    }));
  }
}
