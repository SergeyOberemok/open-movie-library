import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SavedItemsComponent } from './saved-items.component';
import { SavedItemListComponent } from './saved-item-list/saved-item-list.component';

const routes: Routes = [
  {
    path: '',
    component: SavedItemsComponent,
    children: [
      { path: 'list', component: SavedItemListComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedItemsRoutingModule {}
