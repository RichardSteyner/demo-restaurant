import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Category } from './models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private http = inject(HttpClient);

  private categoriesSignal = signal<Category[]>([]);
  private productsSignal = signal<Product[]>([]);

  readonly categories = this.categoriesSignal.asReadonly();
  readonly products = this.productsSignal.asReadonly();

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<Category[]>('assets/data/categories.json').subscribe(
      categories => this.categoriesSignal.set(categories)
    );
    this.http.get<Product[]>('assets/data/products.json').subscribe(
      products => this.productsSignal.set(products)
    );
  }

  // Helper methods to keep compatibility or provide specific views
  getCategories() {
    return this.categories;
  }

  getProducts() {
    return this.products;
  }

  getProductsByCategory(categoryId: number) {
    return this.products().filter(p => p.categoryId === categoryId);
  }

  getProductById(id: number) {
    return this.products().find(p => p.id === id);
  }
}

