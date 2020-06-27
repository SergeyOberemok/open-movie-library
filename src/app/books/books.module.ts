import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BookListComponent } from './book-list/book-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BooksEffects } from './effects/books.effects';
import * as fromBooks from './reducers/books.reducer';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [BooksComponent, BookListComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    EffectsModule.forFeature([BooksEffects]),
    StoreModule.forFeature(fromBooks.booksFeatureKey, fromBooks.reducer),
    CoreModule
  ]
})
export class BooksModule {}
