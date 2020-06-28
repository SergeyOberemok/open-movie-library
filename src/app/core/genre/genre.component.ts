import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, pluck, takeUntil } from 'rxjs/operators';
import * as AppAction from 'src/app/actions';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreComponent implements OnInit, OnDestroy {
  @Input() genres: string[] = [];
  @Input() icon: IconDefinition;
  @Output() genre: EventEmitter<string> = new EventEmitter();

  public genreForm: FormGroup;
  public genreControlName = 'genre';
  public isFocus: boolean;

  get faIcon(): IconDefinition {
    return this.icon || faInfo;
  }

  private destroy$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder, private actions$: ActionsSubject) {}

  ngOnInit(): void {
    this.genreForm = this.fb.group({
      [this.genreControlName]: ['']
    });

    this.genreForm.valueChanges
      .pipe(
        pluck(this.genreControlName),
        filter((genre: string) => !!genre),
        takeUntil(this.destroy$)
      )
      .subscribe((genre: string) => this.genre.emit(genre));

    this.actions$
      .pipe(ofType(AppAction.resetFilters), takeUntil(this.destroy$))
      .subscribe(() => this.genreForm.reset());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get genreControl(): AbstractControl {
    return this.genreForm.get(this.genreControlName);
  }
}
