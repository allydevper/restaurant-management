import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Dish } from '../../models/dish.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { DishesService } from '../../services/dishes.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule, PaginatorModule, CardModule, TagModule],
  providers: [MessageService, ConfirmationService]
})
export class MenuListComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dishesService: DishesService
  ) { }

  ngOnInit() {
    this.dishesService.getDishes().subscribe(
      (response) => {
        if (!response.error) {
          this.dishes = response.data;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
        }
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load dishes' });
      }
    );
  }

  editDish(dish: Dish) {
    this.router.navigate(['/menu/edit', dish.dishid]);
  }

  deleteDish(dish: Dish) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar ' + dish.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
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
