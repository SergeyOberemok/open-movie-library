import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FaIcons } from '../shared';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Subject, Observable } from 'rxjs';
import { pluck, takeUntil, filter } from 'rxjs/operators';

const YEAR_FROM = 1970;

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearPickerComponent implements OnInit, OnDestroy {
  @Input()
  set from(from: number) {
    if (parseInt(from.toString()) < YEAR_FROM) {
      this._from = YEAR_FROM;
    }

    this._from = from;
  }
  @Input() reset: Observable<void>;
  @Output() year: EventEmitter<number> = new EventEmitter();

  public yearPickerForm: FormGroup;
  public yearPickerControlName = 'year';
  public faIcons: FaIcons;
  public years: number[];
  public isFocus: boolean;

  private _from = YEAR_FROM;
  private destroy$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.yearPickerForm = this.fb.group({
      [this.yearPickerControlName]: ['']
    });

    this.faIcons = {
      calendar: faCalendar
    };

    this.years = this.prepareYears();

    this.yearPickerForm.valueChanges
      .pipe(
        pluck(this.yearPickerControlName),
        filter((year: number) => !!year),
        takeUntil(this.destroy$)
      )
      .subscribe((year: number) => this.year.emit(year));

    this.reset
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.yearPickerForm.reset());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private prepareYears(): number[] {
    const currentYear = parseInt(new Date().toISOString().slice(0, 4));

    return Array.from(
      Array(currentYear - this._from + 1).keys(),
      (i) => i + this._from
    );
  }
}