import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { BookListComponent } from './book-list/book-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BooksEffects } from './effects/books.effects';
import * as fromBooks from './reducers/books.reducer';
import { BookItemComponent } from './book-item/book-item.component';

@NgModule({
  declarations: [BooksComponent, BookListComponent, BookItemComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    EffectsModule.forFeature([BooksEffects]),
    StoreModule.forFeature(fromBooks.booksFeatureKey, fromBooks.reducer),
    CoreModule,
    FontAwesomeModule
  ]
})
export class BooksModule {}
