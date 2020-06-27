import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { MoviesEffects } from './effects/movies.effects';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import * as fromMovies from './reducers';
import { MoviesService } from './services/movies.service';

@NgModule({
  declarations: [MoviesComponent, MovieListComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    StoreModule.forFeature(fromMovies.moviesFeatureKey, fromMovies.reducer),
    EffectsModule.forFeature([MoviesEffects]),
    CoreModule,
    FontAwesomeModule
  ],
  providers: [MoviesService]
})
export class MoviesModule {}
