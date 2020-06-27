import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { pluck, takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreComponent implements OnInit, OnDestroy {
  @Input() genres: string[] = [];
  @Input() icon: IconDefinition;
  @Input() reset: Observable<void>;
  @Output() genre: EventEmitter<string> = new EventEmitter();

  public genreForm: FormGroup;
  public genreControlName = 'genre';
  public isFocus: boolean;

  get faIcon(): IconDefinition {
    return this.icon || faInfo;
  }

  private destroy$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder) {}

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

    this.reset
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.genreForm.reset());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
