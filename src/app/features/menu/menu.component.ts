import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../core/menu.service';
import { CartService } from '../../core/cart.service';
import { ProductCardComponent } from '../../shared/components/product-card.component';
import { Category, Product } from '../../core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categories$: Observable<Category[]>;
  products$: Observable<Product[]>;
  selectedCategoryId: number = 0;
  filteredProducts$: Observable<Product[]>;

  constructor(
    private menuService: MenuService,
    private cartService: CartService
  ) {
    this.categories$ = this.menuService.getCategories();
    this.products$ = this.menuService.getProducts();
    this.filteredProducts$ = this.products$;
  }

  ngOnInit(): void {}

  selectCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    if (categoryId === 0) {
      this.filteredProducts$ = this.products$;
    } else {
      this.filteredProducts$ = this.menuService.getProductsByCategory(categoryId);
    }
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    // Could add a toast notification here
  }
}
