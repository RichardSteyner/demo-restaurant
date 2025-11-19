import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { CartItem } from '../../core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems();
    this.total$ = this.cartService.getCartTotal();
  }

  ngOnInit(): void {}

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  clearCart(): void {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      this.cartService.clearCart();
    }
  }
}
