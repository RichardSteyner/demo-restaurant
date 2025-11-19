import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { OrderService } from '../../core/order.service';
import { CartItem } from '../../core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;
  
  customerName = '';
  customerEmail = '';
  customerPhone = '';
  paymentMethod = 'credit-card';
  isSubmitting = false;
  orderConfirmed = false;
  confirmedOrderId: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.getCartItems();
    this.total$ = this.cartService.getCartTotal();
  }

  ngOnInit(): void {}

  getTotalWithTax(total: number): number {
    return total + 5 + (total * 0.08);
  }

  submitOrder(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    // Simulating payment processing
    setTimeout(() => {
      this.cartItems$.subscribe(items => {
        this.total$.subscribe(total => {
          const order = this.orderService.createOrder(
            items,
            this.getTotalWithTax(total),
            this.customerName,
            this.customerEmail,
            this.customerPhone
          );

          this.confirmedOrderId = order.id;
          this.orderConfirmed = true;
          this.isSubmitting = false;
          this.cartService.clearCart();
        });
      });
    }, 1500);
  }

  validateForm(): boolean {
    if (!this.customerName.trim()) {
      alert('Por favor ingresa tu nombre');
      return false;
    }
    if (!this.customerEmail.trim() || !this.isValidEmail(this.customerEmail)) {
      alert('Por favor ingresa un email válido');
      return false;
    }
    if (!this.customerPhone.trim()) {
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
