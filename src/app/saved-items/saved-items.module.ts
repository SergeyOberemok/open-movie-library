import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { MoviesModule } from '../movies/movies.module';
import { SavedItemListComponent } from './saved-item-list/saved-item-list.component';
import { SavedItemsRoutingModule } from './saved-items-routing.module';
import { SavedItemsComponent } from './saved-items.component';

@NgModule({
  declarations: [SavedItemsComponent, SavedItemListComponent],
  imports: [CommonModule, SavedItemsRoutingModule, CoreModule, MoviesModule]
})
export class SavedItemsModule {}
