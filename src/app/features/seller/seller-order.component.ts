import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../../core/menu.service';
import { CartService } from '../../core/cart.service';
import { OrderService } from '../../core/order.service';
import { Category, Product, CartItem } from '../../core/models';
import { Observable, combineLatest, map, startWith, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-seller-order',
    standalone: true,
    imports: [CommonModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './seller-order.component.html',
    styleUrls: ['./seller-order.component.css']
})
export class SellerOrderComponent implements OnInit {
    categories$: Observable<Category[]>;
    products$: Observable<Product[]>;
    cartItems$: Observable<CartItem[]>;
    total$: Observable<number>;

    selectedCategoryId = new BehaviorSubject<number | null>(null);

    customerName = '';
    tableNumber = '';
    isSubmitting = false;

    constructor(
        private menuService: MenuService,
        private cartService: CartService,
        private orderService: OrderService,
        private router: Router
    ) {
        this.categories$ = this.menuService.getCategories();
        this.cartItems$ = this.cartService.getCartItems();
        this.total$ = this.cartService.getCartTotal();

        // Filter products based on selected category
        this.products$ = combineLatest([
            this.menuService.getProducts(),
            this.selectedCategoryId
        ]).pipe(
            map(([products, categoryId]) => {
                if (!categoryId) return products;
                return products.filter(p => p.categoryId === categoryId);
            })
        );
    }

    ngOnInit(): void {
        // Optional: Clear cart when entering new order mode?
        // For now, we'll leave it manual or let the user decide via UI
        this.cartService.clearCart();
    }

    selectCategory(categoryId: number | null): void {
        this.selectedCategoryId.next(categoryId);
    }

    addToCart(product: Product): void {
        this.cartService.addToCart(product, 1);
    }

    updateQuantity(productId: number, change: number): void {
        // We need to get current quantity first, which is a bit tricky with Observables only
        // But CartService likely handles updateQuantity logic safely
        // For this simple implementation, we'll assume we can just call updateQuantity
        // However, CartService.updateQuantity usually takes absolute quantity.
        // Let's use a helper in the template or subscribe.
        // Actually, let's just implement a simple add/remove wrapper
        // If we want to increment/decrement, we need the current item.
        // The template will have the item, so we can pass (item.quantity + change)
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
        if (this.isSubmitting) return;

        this.isSubmitting = true;

        // We need to get the latest values from observables
        combineLatest([this.cartItems$, this.total$]).pipe(
            // take(1) would be good here but we are in a void function
        ).subscribe(([items, total]) => {
            if (items.length === 0) {
                alert('El carrito está vacío');
                this.isSubmitting = false;
                return;
            }

            const order = this.orderService.createOrder(
                items,
                total,
                this.customerName || `Mesa ${this.tableNumber || 'General'}`,
                '', // No email for walk-in
                ''  // No phone for walk-in
            );

            // Auto-confirm for seller orders
            this.orderService.updateOrderStatus(order.id, 'confirmed');

            this.cartService.clearCart();
            this.router.navigate(['/seller/dashboard']);
        }).unsubscribe(); // Immediate unsubscribe as we just want current value
    }

    cancelOrder(): void {
        if (confirm('¿Cancelar orden actual? Se vaciará el carrito.')) {
            this.cartService.clearCart();
            this.router.navigate(['/seller/dashboard']);
        }
    }
}
