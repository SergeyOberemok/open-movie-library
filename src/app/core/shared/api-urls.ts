import { InjectionToken } from '@angular/core';

export interface API_URLS {
  [key: string]: string;
}

export const API_URLS_TOKEN = new InjectionToken<string>('API_URLS_TOKEN');

export const api_urls: API_URLS = {
  movies: '/api/movies'
}
