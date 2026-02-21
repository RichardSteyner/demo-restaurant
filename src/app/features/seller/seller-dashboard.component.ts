import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/order.service';

@Component({
    selector: 'app-seller-dashboard',
    imports: [CommonModule, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './seller-dashboard.component.html',
    styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent {
    private orderService = inject(OrderService);

    orders = computed(() =>
        [...this.orderService.orders()].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    );

    updateStatus(orderId: number, status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered'): void {
        this.orderService.updateOrderStatus(orderId, status);
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'preparing': return 'bg-purple-100 text-purple-800';
            case 'ready': return 'bg-green-100 text-green-800';
            case 'delivered': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    getStatusLabel(status: string): string {
        switch (status) {
            case 'pending': return 'Pendiente';
            case 'confirmed': return 'Confirmado';
            case 'preparing': return 'Preparando';
            case 'ready': return 'Listo';
            case 'delivered': return 'Entregado';
            default: return status;
        }
    }
}

