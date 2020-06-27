import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Movie } from '../shared';

@Component({
  selector: 'app-movie-item-sm',
  templateUrl: './movie-item-sm.component.html',
  styleUrls: ['./movie-item-sm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemSmComponent implements OnInit {
  @Input() movie: Movie;

  constructor() {}

  ngOnInit(): void {}
}
