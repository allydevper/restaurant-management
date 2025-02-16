import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Order } from '../../models/order.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { TagModule } from 'primeng/tag';
import { SharedMessageService } from '../../services/shared-message.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrl: './order-list.component.scss',
    imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule, PaginatorModule, CardModule, TagModule]
})
export class OrderListComponent implements OnInit {
    orders: Order[] = [];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private ordersService: OrdersService,
        private sharedMessageService: SharedMessageService
    ) { }

    ngOnInit() {
        const sharedMessage = this.sharedMessageService.show();
        if (sharedMessage) {
            setTimeout(() => {
                this.messageService.add(sharedMessage);
            }, 0);
        }

        this.ordersService.getOrders().subscribe({
            next: (response) => {
                if (!response.error) {
                    this.orders = response.data;
                }
                else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
                }
            },
            error: (error) => {
                console.error(error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los pedidos.' });
            }
        });
    }

    editOrder(order: Order) {
        this.router.navigate(['/order/edit', order.orderid]);
    }

    deleteOrder(order: Order) {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que deseas eliminar este pedido?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => {
                this.ordersService.deleteOrder(order.orderid!.toString()).subscribe({
                    next: (response) => {
                        if (!response.error) {
                            this.orders = this.orders.filter(o => o.orderid !== order.orderid);
                            this.messageService.add({ severity: 'success', summary: 'Pedido Eliminado', detail: 'El pedido ha sido eliminado correctamente.' });
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
                        }
                    },
                    error: (error) => {
                        console.error(error);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el pedido.' });
                    }
                });
            }
        });
    }

    createOrder() {
        this.router.navigate(['/order/create']);
    }
}
