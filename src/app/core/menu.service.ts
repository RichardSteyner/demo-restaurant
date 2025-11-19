import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, Category } from './models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private productsSubject = new BehaviorSubject<Product[]>([]);

  categories$ = this.categoriesSubject.asObservable();
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<Category[]>('assets/data/categories.json').subscribe(
      categories => this.categoriesSubject.next(categories)
    );
    this.http.get<Product[]>('assets/data/products.json').subscribe(
      products => this.productsSubject.next(products)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        observer.next(products.filter(p => p.categoryId === categoryId));
      });
    });
  }

  getProductById(id: number): Observable<Product | undefined> {
    return new Observable(observer => {
      this.products$.subscribe(products => {
        observer.next(products.find(p => p.id === id));
      });
    });
  }
}
