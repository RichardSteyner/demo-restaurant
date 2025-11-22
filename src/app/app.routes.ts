import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MenuComponent } from './features/menu/menu.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/order/checkout.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'seller/dashboard',
    loadComponent: () => import('./features/seller/seller-dashboard.component').then(m => m.SellerDashboardComponent)
  },
  {
    path: 'seller/order',
    loadComponent: () => import('./features/seller/seller-order.component').then(m => m.SellerOrderComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
