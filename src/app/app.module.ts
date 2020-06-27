import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { api_urls, API_URLS_TOKEN } from './core/shared';
import { AppEffects } from './effects/app.effects';
import * as fromApp from './reducers';
import { SavedItemsModule } from './saved-items/saved-items.module';
import { InMemoryMockService } from './services/in-memory-mock.service';
import { MoviesModule } from './movies/movies.module';
import { BooksModule } from './books/books.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    !environment.production && environment.mockServer
      ? InMemoryWebApiModule.forRoot(InMemoryMockService)
      : [],
    StoreModule.forRoot(
      { app: fromApp.reducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    FontAwesomeModule,
    CoreModule,
    MoviesModule,
    BooksModule,
    SavedItemsModule
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
