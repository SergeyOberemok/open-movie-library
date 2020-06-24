import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { api_urls, API_URLS_TOKEN } from './core/shared';
import * as fromApp from './reducers';
import { InMemoryMockService } from './services/in-memory-mock.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    !environment.production && environment.mockServer
      ? InMemoryWebApiModule.forRoot(InMemoryMockService)
      : [],
    StoreModule.forRoot(fromApp.initialState, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot()
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
