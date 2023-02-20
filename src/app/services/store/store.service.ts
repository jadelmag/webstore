import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  STORE_BASE_URL: string = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  getAllProducts(
    limit = 12,
    sort = 'desc',
    category?: string
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.STORE_BASE_URL}/products${
        category ? '/category/' + category : ''
      }?sort=${sort}&limit=${limit}`
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.STORE_BASE_URL}/products/categories`
    );
  }
}
