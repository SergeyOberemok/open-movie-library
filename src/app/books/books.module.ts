import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { BookItemSmComponent } from './book-item-sm/book-item-sm.component';
import { BookItemComponent } from './book-item/book-item.component';
import { BookListComponent } from './book-list/book-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BooksEffects } from './effects/books.effects';
import * as fromBooks from './reducers/books.reducer';
import { BooksService } from './services/books.service';

@NgModule({
  declarations: [
    BooksComponent,
    BookListComponent,
    BookItemComponent,
    BookItemSmComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    EffectsModule.forFeature([BooksEffects]),
    StoreModule.forFeature(fromBooks.booksFeatureKey, fromBooks.reducer),
    CoreModule,
    FontAwesomeModule
  ],
  providers: [BooksService],
  exports: [BooksComponent, BookItemComponent, BookItemSmComponent]
})
export class BooksModule {}
