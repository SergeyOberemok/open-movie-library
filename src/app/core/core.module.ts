import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search/search.component';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { GenreComponent } from './genre/genre.component';

@NgModule({
  declarations: [SearchComponent, YearPickerComponent, GenreComponent],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [SearchComponent, YearPickerComponent, GenreComponent]
})
export class CoreModule {}
