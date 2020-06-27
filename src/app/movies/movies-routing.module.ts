import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent,
    children: [{ path: 'movie/:id', component: MovieItemComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
