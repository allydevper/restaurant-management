import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../models/order.model';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { SharedMessageService } from '../../services/shared-message.service';

@Component({
    selector: 'app-order-form',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectModule, CheckboxModule, ButtonModule, MessageModule, ToastModule, ConfirmDialogModule, CardModule, InputNumberModule, InputTextModule],
    templateUrl: './order-form.component.html',
    styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {
    orderForm: FormGroup;
    isEditMode: boolean = false;

    constructor(private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private ordersService: OrdersService,
        private sharedMessageService: SharedMessageService) {

        this.orderForm = this.fb.group({
            tableid: ['', Validators.required],
            comments: [''],
            status: ['en preparación', Validators.required],
            total: [0, [Validators.required, Validators.min(0)]]
        });
    }

    ngOnInit() {
        const orderId = this.route.snapshot.paramMap.get('id');
        if (orderId) {
            this.isEditMode = true;
            this.ordersService.getOrderById(orderId!).subscribe({
                next: (response) => {
                    if (!response.error) {
                        this.orderForm.patchValue({
                            tableid: response?.data?.tableid,
                            status: response?.data?.status,
                            total: response?.data?.total
                        });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
                    }
                },
                error: (error) => {
                    console.error(error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la información del pedido.' });
                }
            });
        }
    }

    onSubmit() {
        if (this.orderForm.valid) {
            const newOrder: Order = this.orderForm.value;
            if (this.isEditMode) {
                const orderId = this.route.snapshot.paramMap.get('id');
                this.ordersService.updateOrder(orderId!, newOrder).subscribe({
                    next: (response) => {
                        if (!response.error) {
                            this.sharedMessageService.add({ severity: 'success', summary: 'Pedido Actualizado', detail: 'El pedido ha sido actualizado correctamente.' });
                            this.goBack();
                        }
                        else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
                        }
                    },
                    error: (error) => {
                        console.error(error);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el pedido.' });
                    }
                });
            } else {
                this.ordersService.createOrder(newOrder).subscribe({
                    next: (response) => {
                        if (!response.error) {
                            this.sharedMessageService.add({ severity: 'success', summary: 'Pedido Creado', detail: 'El pedido ha sido creado correctamente.' });
                            this.goBack();
                        }
                        else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
                        }
                    },
                    error: (error) => {
                        console.error(error);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el pedido.' });
                    }
                });
            }
        } else {
            this.orderForm.markAllAsTouched();
        }
    }

    goBack() {
        this.router.navigate(['/order']);
    }
}
