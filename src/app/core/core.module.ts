import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search/search.component';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { GenreComponent } from './genre/genre.component';
import { SelectedFiltersComponent } from './selected-filters/selected-filters.component';

@NgModule({
  declarations: [
    SearchComponent,
    YearPickerComponent,
    GenreComponent,
    SelectedFiltersComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [
    SearchComponent,
    YearPickerComponent,
    GenreComponent,
    SelectedFiltersComponent
  ]
})
export class CoreModule {}
