import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SavedItemsComponent } from './saved-items/saved-items.component';
import { MoviesComponent } from './movies/movies.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'saved-items',
    component: SavedItemsComponent
  },
  { path: '', redirectTo: 'movies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
