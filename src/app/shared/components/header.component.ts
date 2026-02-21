import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'sticky top-0 z-50 block w-full'
  },
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  cartItemsCount = this.cartService.itemsCount;
  isMenuOpen = signal(false);
  isProfileOpen = signal(false);

  isAuthenticated = this.authService.isAuthenticated;
  currentUser = this.authService.currentUser;

  canAccessDashboard = computed(() => {
    const user = this.currentUser();
    return user && (user.role === 'seller' || user.role === 'admin');
  });

  toggleProfile(): void {
    this.isProfileOpen.update(open => !open);
  }

  logout(): void {
    this.isProfileOpen.set(false);
    this.authService.logout();
  }

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}

