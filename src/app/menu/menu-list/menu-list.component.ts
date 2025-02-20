import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Dish } from '../../models/dish.model';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { DishesService } from '../../services/dishes.service';
import { TagModule } from 'primeng/tag';
import { SharedMessageService } from '../../services/shared-message.service';
import { SharedConfirmationService } from '../../services/shared-confirmation.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule, PaginatorModule, CardModule, TagModule]
})
export class MenuListComponent implements OnInit {
  dishes: Dish[] = [];
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private dishesService: DishesService,
    private sharedMessageService: SharedMessageService,
    private sharedConfirmationService: SharedConfirmationService
  ) { }

  ngOnInit() {
    const sharedMessage = this.sharedMessageService.show();
    if (sharedMessage) {
      setTimeout(() => {
        this.messageService.add(sharedMessage);
      }, 0);
    }
  }

  loadDishes() {
    this.dishesService.getDishesByPage((this.first / this.rows) + 1, this.rows).subscribe({
      next: (response) => {
        if (!response.error) {
          this.dishes = response.data;
          this.totalRecords = response.count;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
        }
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los platos.' });
      }
    });
  }

  loadDishesLazy(event: TableLazyLoadEvent) {
    console.log(event);
    this.first = event.first!;
    this.rows = event.rows!;
    this.loadDishes();
  }

  editDish(dish: Dish) {
    this.router.navigate(['/menu/edit', dish.dishid]);
  }

  deleteDish(dish: Dish) {
    this.sharedConfirmationService.confirmDelete('¿Estás seguro de que deseas eliminar este plato?', () => {
      this.dishesService.deleteDish(dish.dishid!.toString()).subscribe({
        next: (response) => {
          if (!response.error) {
            this.loadDishes();
            this.messageService.add({ severity: 'success', summary: 'Plato Eliminado', detail: 'El plato ha sido eliminado correctamente.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
          }
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el plato.' });
        }
      });
    });
  }

  createDish() {
    this.router.navigate(['/menu/create']);
  }
}
