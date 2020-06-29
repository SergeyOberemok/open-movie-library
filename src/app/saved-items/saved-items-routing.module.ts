import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookItemComponent } from '../books/book-item/book-item.component';
import { MovieItemComponent } from '../movies/movie-item/movie-item.component';
import { SavedItemsComponent } from './saved-items.component';

const routes: Routes = [
  {
    path: '',
    component: SavedItemsComponent,
    children: [
      { path: 'movie/:id', component: MovieItemComponent },
      { path: 'book/:id', component: BookItemComponent }
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedItemsRoutingModule {}
