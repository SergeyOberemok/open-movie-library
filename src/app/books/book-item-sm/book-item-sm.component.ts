import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Book } from '../shared';

@Component({
  selector: 'app-book-item-sm',
  templateUrl: './book-item-sm.component.html',
  styleUrls: ['./book-item-sm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookItemSmComponent implements OnInit {
  @Input() book: Book;

  constructor() {}

  ngOnInit(): void {}
}
