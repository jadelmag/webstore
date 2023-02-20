import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store/store.service';
import { Subscription } from 'rxjs';

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  columns = 3;
  category: string | undefined;
  rowHeights = ROW_HEIGHT[this.columns];
  products: Product[] | undefined;
  sort = 'desc';
  count = 12;
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private store: StoreService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  getProducts(): void {
    this.productsSubscription = this.store
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products: Product[]) => {
        this.products = _products;
      });
  }

  onColumnsChanged(columnsNum: number) {
    this.columns = columnsNum;
    this.rowHeights = ROW_HEIGHT[this.columns];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemsChange(newCount: number): void {
    this.count = newCount;
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
}
