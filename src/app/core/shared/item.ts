export class Item {
  constructor(private _itemType: string) { }

  public get itemType(): string {
    return this._itemType;
  }

  public isItem(itemType: string): boolean {
    return this._itemType === itemType;
  }

}
