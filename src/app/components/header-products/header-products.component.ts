import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-products',
  templateUrl: './header-products.component.html',
})
export class HeaderProductsComponent implements OnInit {
  @Output() columnsCount = new EventEmitter<number>();
  @Output() itemsChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = 'desc';
  itemsShowCount = 12;

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSortOption: string): void {
    if (this.sort === newSortOption) return;
    this.sort = newSortOption;
    this.sortChange.emit(newSortOption);
  }

  onItemsUpdated(newCount: number): void {
    if (this.itemsShowCount === newCount) return;
    this.itemsShowCount = newCount;
    this.itemsChange.emit(newCount);
  }

  onColumnsUpdated(columnsNum: number): void {
    this.columnsCount.emit(columnsNum);
  }
}
