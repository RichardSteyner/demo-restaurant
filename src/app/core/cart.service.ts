import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from './models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSignal = signal<CartItem[]>([]);

  // Publicly exposed signals
  readonly items = this.cartItemsSignal.asReadonly();

  readonly totalAmount = computed(() =>
    this.items().reduce((total, item) => total + (item.product.price * item.quantity), 0)
  );

  readonly itemsCount = computed(() =>
    this.items().reduce((count, item) => count + item.quantity, 0)
  );

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartItemsSignal.set(JSON.parse(saved));
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItemsSignal()));
  }

  addToCart(product: Product, quantity: number = 1): void {
    this.cartItemsSignal.update(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);

      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...currentCart, { product, quantity }];
      }
    });
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.cartItemsSignal.update(currentCart =>
      currentCart.filter(item => item.product.id !== productId)
    );
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItemsSignal.update(currentCart =>
      currentCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
    this.saveCart();
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
    localStorage.removeItem('cart');
  }

  // Legacy methods kept for temporary compatibility if needed, 
  // but ideally components should switch to signals
  getCartTotal() {
    return this.totalAmount;
  }

  getCartItemsCount() {
    return this.itemsCount;
  }

  getCartItems() {
    return this.items;
  }
}

