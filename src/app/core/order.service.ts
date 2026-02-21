import { Injectable, signal } from '@angular/core';
import { CartItem, Order } from './models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSignal = signal<Order[]>([]);
  readonly orders = this.ordersSignal.asReadonly();

  constructor() {
    this.loadOrders();
  }

  private loadOrders(): void {
    const saved = localStorage.getItem('orders');
    if (saved) {
      this.ordersSignal.set(JSON.parse(saved));
    }
  }

  private saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.ordersSignal()));
  }

  createOrder(
    items: CartItem[],
    totalAmount: number,
    customerName: string,
    customerEmail: string,
    customerPhone: string
  ): Order {
    const order: Order = {
      id: Date.now(),
      items,
      totalAmount,
      customerName,
      customerEmail,
      customerPhone,
      createdAt: new Date(),
      status: 'pending'
    };

    this.ordersSignal.update(currentOrders => [...currentOrders, order]);
    this.saveOrders();

    return order;
  }

  getOrders() {
    return this.orders;
  }

  getOrderById(id: number) {
    return this.orders().find(o => o.id === id);
  }

  updateOrderStatus(orderId: number, status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered'): void {
    this.ordersSignal.update(currentOrders =>
      currentOrders.map(o => o.id === orderId ? { ...o, status } : o)
    );
    this.saveOrders();
  }
}

