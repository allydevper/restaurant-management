import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Order } from '../../models/order.model';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { TagModule } from 'primeng/tag';
import { SharedMessageService } from '../../services/shared-message.service';
import { PaginationService } from '../../services/pagination.service';
import { SharedConfirmationService } from '../../services/shared-confirmation.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrl: './order-list.component.scss',
    imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule, PaginatorModule, CardModule, TagModule]
})
export class OrderListComponent implements OnInit {
    private readonly componentKey = 'OrderListComponent';
    loading: boolean = false;
    orders: Order[] = [];
    totalRecords: number = 0;
    rows: number = 10;
    first: number = 0;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private messageService: MessageService,
        private router: Router,
        private ordersService: OrdersService,
        private sharedMessageService: SharedMessageService,
        private sharedConfirmationService: SharedConfirmationService,
        private paginationService: PaginationService
    ) { }

    ngOnInit() {
        const sharedMessage = this.sharedMessageService.show();
        if (sharedMessage) {
            setTimeout(() => {
                this.messageService.add(sharedMessage);
            }, 0);
        }
    }

    loadOrders() {
        this.loading = true;
        this.changeDetectorRef.detectChanges();

        this.ordersService.getOrdersByPage((this.first / this.rows) + 1, this.rows).subscribe({
            next: (response) => {
                if (!response.error) {
                    this.orders = response.data;
                    this.totalRecords = response.count;
                }
                else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
                }
            },
            error: (error) => {
                console.error(error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los pedidos.' });
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    loadOrdersLazy(event: TableLazyLoadEvent) {
        this.first = event.first!;
        this.rows = event.rows!;
        this.loadOrders();
        this.paginationService.savePaginationState(this.componentKey, this.first, this.rows);
    }

    editOrder(order: Order) {
        this.router.navigate(['/order/edit', order.orderid]);
    }

    deleteOrder(order: Order) {

        this.sharedConfirmationService.confirmDelete('¿Estás seguro de que deseas eliminar este pedido?', () => {

            this.loading = true;
            this.changeDetectorRef.detectChanges();

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
                },
                complete: () => {
                    this.loading = false;
                }
            });
        });
    }

    createOrder() {
        this.router.navigate(['/order/create']);
    }
}
