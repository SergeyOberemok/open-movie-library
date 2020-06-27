import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SavedItemsRoutingModule } from './saved-items-routing.module';
import { SavedItemsComponent } from './saved-items.component';
import { SavedItemListComponent } from './saved-item-list/saved-item-list.component';
import { StoreModule } from '@ngrx/store';
import * as fromSavedItems from './reducers/saved-items.reducer';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [SavedItemsComponent, SavedItemListComponent],
  imports: [
    CommonModule,
    SavedItemsRoutingModule,
    StoreModule.forFeature(fromSavedItems.savedItemsFeatureKey, fromSavedItems.reducer),
    CoreModule
  ]
})
export class SavedItemsModule {}
