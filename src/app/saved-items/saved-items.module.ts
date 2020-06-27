import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import * as fromSavedItems from './reducers/saved-items.reducer';
import { SavedItemListComponent } from './saved-item-list/saved-item-list.component';
import { SavedItemsRoutingModule } from './saved-items-routing.module';
import { SavedItemsComponent } from './saved-items.component';
import { MoviesModule } from '../movies/movies.module';
import { BooksModule } from '../books/books.module';

@NgModule({
  declarations: [SavedItemsComponent, SavedItemListComponent],
  imports: [
    CommonModule,
    SavedItemsRoutingModule,
    StoreModule.forFeature(
      fromSavedItems.savedItemsFeatureKey,
      fromSavedItems.reducer
    ),
    CoreModule,
    MoviesModule,
    BooksModule
  ]
})
export class SavedItemsModule {}
