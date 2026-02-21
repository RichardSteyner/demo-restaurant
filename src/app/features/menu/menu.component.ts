import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../core/menu.service';
import { CartService } from '../../core/cart.service';
import { ProductCardComponent } from '../../shared/components/product-card.component';
import { Product } from '../../core/models';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  private menuService = inject(MenuService);
  private cartService = inject(CartService);

  categories = this.menuService.categories;
  products = this.menuService.products;
  selectedCategoryId = signal<number>(0);

  filteredProducts = computed(() => {
    const categoryId = this.selectedCategoryId();
    const allProducts = this.products();
    if (categoryId === 0) {
      return allProducts;
    }
    return allProducts.filter(p => p.categoryId === categoryId);
  });

  selectCategory(categoryId: number): void {
    this.selectedCategoryId.set(categoryId);
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }
}

