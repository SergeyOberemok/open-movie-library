import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookItemComponent } from './book-item/book-item.component';
import { BooksComponent } from './books.component';

const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    children: [{ path: 'book/:id', component: BookItemComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
