import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../../core/menu.service';
import { CartService } from '../../core/cart.service';
import { OrderService } from '../../core/order.service';
import { Product } from '../../core/models';

@Component({
    selector: 'app-seller-order',
    imports: [CommonModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './seller-order.component.html',
    styleUrls: ['./seller-order.component.css']
})
export class SellerOrderComponent {
    private menuService = inject(MenuService);
    private cartService = inject(CartService);
    private orderService = inject(OrderService);
    private router = inject(Router);

    categories = this.menuService.categories;
    cartItems = this.cartService.items;
    total = this.cartService.totalAmount;

    selectedCategoryId = signal<number | null>(null);
    customerName = signal('');
    tableNumber = signal('');
    isSubmitting = signal(false);

    products = computed(() => {
        const categoryId = this.selectedCategoryId();
        const allProducts = this.menuService.products();
        if (!categoryId) return allProducts;
        return allProducts.filter(p => p.categoryId === categoryId);
    });

    constructor() {
        this.cartService.clearCart();
    }

    selectCategory(categoryId: number | null): void {
        this.selectedCategoryId.set(categoryId);
    }

    addToCart(product: Product): void {
        this.cartService.addToCart(product, 1);
    }

    setQuantity(productId: number, quantity: number): void {
        if (quantity <= 0) {
            this.cartService.removeFromCart(productId);
        } else {
            this.cartService.updateQuantity(productId, quantity);
        }
    }

    removeFromCart(productId: number): void {
        this.cartService.removeFromCart(productId);
    }

    submitOrder(): void {
        if (this.isSubmitting()) return;

        const items = this.cartItems();
        if (items.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        this.isSubmitting.set(true);

        const order = this.orderService.createOrder(
            items,
            this.total(),
            this.customerName() || `Mesa ${this.tableNumber() || 'General'}`,
            '', // No email for walk-in
            ''  // No phone for walk-in
        );

        // Auto-confirm for seller orders
        this.orderService.updateOrderStatus(order.id, 'confirmed');

        this.cartService.clearCart();
        this.router.navigate(['/seller/dashboard']);
    }

    cancelOrder(): void {
        if (confirm('¿Cancelar orden actual? Se vaciará el carrito.')) {
            this.cartService.clearCart();
            this.router.navigate(['/seller/dashboard']);
        }
    }
}

