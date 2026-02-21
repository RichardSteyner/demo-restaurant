import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { OrderService } from '../../core/order.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  cartItems = this.cartService.items;
  total = this.cartService.totalAmount;

  customerName = signal('');
  customerEmail = signal('');
  customerPhone = signal('');
  paymentMethod = signal('credit-card');

  isSubmitting = signal(false);
  orderConfirmed = signal(false);
  confirmedOrderId = signal<number>(0);

  getTotalWithTax(total: number): number {
    return total + 5 + (total * 0.08);
  }

  submitOrder(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting.set(true);

    // Simulating payment processing
    setTimeout(() => {
      const order = this.orderService.createOrder(
        this.cartItems(),
        this.getTotalWithTax(this.total()),
        this.customerName(),
        this.customerEmail(),
        this.customerPhone()
      );

      this.confirmedOrderId.set(order.id);
      this.orderConfirmed.set(true);
      this.isSubmitting.set(false);
      this.cartService.clearCart();
    }, 1500);
  }

  validateForm(): boolean {
    if (!this.customerName().trim()) {
      alert('Por favor ingresa tu nombre');
      return false;
    }
    if (!this.customerEmail().trim() || !this.isValidEmail(this.customerEmail())) {
      alert('Por favor ingresa un email válido');
      return false;
    }
    if (!this.customerPhone().trim()) {
      alert('Por favor ingresa tu teléfono');
      return false;
    }
    return true;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  continueShopping(): void {
    this.router.navigate(['/menu']);
  }
}

