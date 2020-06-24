import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MoviesService } from './services/movies.service';

@NgModule({
  declarations: [MoviesComponent, MovieListComponent],
  imports: [CommonModule, MoviesRoutingModule],
  providers: [MoviesService]
})
export class MoviesModule {}
