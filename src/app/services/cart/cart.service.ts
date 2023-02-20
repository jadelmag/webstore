import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  CHECKOUT_URL: string = 'http://localhost:4242/checkout';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemsInCart: CartItem | undefined = items.find(
      (_item: CartItem) => _item.id === item.id
    );

    if (itemsInCart) {
      itemsInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this.snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item: CartItem) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this.snackBar.open('Cart is clear', 'Ok', { duration: 3000 });
  }

  addQuantity(item: CartItem): void {
    let items = [...this.cart.value.items];
    let updatedItems: Array<CartItem> = items.map((_item: CartItem) => {
      if (_item.id === item.id) {
        _item.quantity++;
      }
      return _item;
    });
    this.cart.next({ items: updatedItems });
  }

  removeQuantity(item: CartItem): void {
    let items = [...this.cart.value.items];
    let updatedItems: Array<CartItem> = items.map((_item: CartItem) => {
      if (_item.id === item.id) {
        _item.quantity--;
      }
      return _item;
    });
    const removedItems = updatedItems.filter(
      (_item: CartItem) => _item.quantity !== 0
    );

    this.cart.next({ items: removedItems });
    this.snackBar.open('1 Item removed from cart', 'OK', {
      duration: 3000,
    });
  }

  removeFromCart(item: CartItem): void {
    const filteredItems: CartItem[] = this.cart.value.items.filter(
      (_item: CartItem) => _item.id !== item.id
    );

    this.cart.next({ items: filteredItems });
    this.snackBar.open('1 Item removed from cart', 'OK', { duration: 3000 });
  }

  checkoutProducts(): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(this.CHECKOUT_URL, {
      items: this.cart.value.items,
    });
  }
}
