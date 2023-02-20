import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: string[] | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  getAllCategories(): void {
    this.categoriesSubscription = this.store
      .getAllCategories()
      .subscribe((_categories: string[]) => {
        this.categories = _categories;
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
