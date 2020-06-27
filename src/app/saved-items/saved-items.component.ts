import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.component.html',
  styleUrls: ['./saved-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedItemsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
