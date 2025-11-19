import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Order } from './models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = new BehaviorSubject<Order[]>([]);
  orders$ = this.orders.asObservable();

  constructor() {
    this.loadOrders();
  }

  private loadOrders(): void {
    const saved = localStorage.getItem('orders');
    if (saved) {
      this.orders.next(JSON.parse(saved));
    }
  }

  private saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders.value));
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

    const currentOrders = this.orders.value;
    currentOrders.push(order);
    this.orders.next([...currentOrders]);
    this.saveOrders();

    return order;
  }

  getOrders(): Observable<Order[]> {
    return this.orders$;
  }

  getOrderById(id: number): Observable<Order | undefined> {
    return new Observable(observer => {
      this.orders$.subscribe(orders => {
        observer.next(orders.find(o => o.id === id));
      });
    });
  }

  updateOrderStatus(orderId: number, status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered'): void {
    const currentOrders = this.orders.value;
    const order = currentOrders.find(o => o.id === orderId);
    
    if (order) {
      order.status = status;
      this.orders.next([...currentOrders]);
      this.saveOrders();
    }
  }
}
