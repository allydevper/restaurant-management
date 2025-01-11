import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Dish, DishCategory } from '../../models/dish.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule, PaginatorModule, CardModule],
  providers: [MessageService, ConfirmationService]
})
export class MenuListComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    // Simulación de carga de platos
    this.dishes = [
      {
        dishId: 1,
        name: 'Caesar Salad',
        category: DishCategory.APPETIZER,
        price: 12.99,
        isAvailable: true,
        createdAt: new Date()
      },
      {
        dishId: 2,
        name: 'Grilled Chicken',
        category: DishCategory.MAIN,
        price: 15.99,
        isAvailable: false,
        createdAt: new Date()
      }
    ];
  }

  editDish(dish: Dish) {
    this.router.navigate(['/menu/edit', dish.dishId]);
  }

  deleteDish(dish: Dish) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar ' + dish.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Lógica para eliminar el plato
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Dish Deleted',
          life: 3000
        });
      }
    });
  }

  createDish() {
    this.router.navigate(['/menu/create']);
  }
}
