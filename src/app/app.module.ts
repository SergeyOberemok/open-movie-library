import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryMockService } from './services/in-memory-mock.service';
import { api_urls, API_URLS_TOKEN } from './core/shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    !environment.production && environment.mockServer
      ? InMemoryWebApiModule.forRoot(InMemoryMockService)
      : []
  ],
  providers: [
    {
      provide: API_URLS_TOKEN,
      useValue: api_urls
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
