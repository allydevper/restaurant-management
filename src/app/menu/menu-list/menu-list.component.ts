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
import { SharedMessageService } from '../../services/shared-message.service';

@Component({
    selector: 'app-menu-list',
    templateUrl: './menu-list.component.html',
    styleUrls: ['./menu-list.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule, PaginatorModule, CardModule, TagModule]
})
export class MenuListComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dishesService: DishesService,
    private sharedMessageService: SharedMessageService
  ) { }

  ngOnInit() {
    const sharedMessage = this.sharedMessageService.show();
    if (sharedMessage) {
      setTimeout(() => {
        this.messageService.add(sharedMessage);
      }, 0);
    }

    this.dishesService.getDishes().subscribe({
      next: (response) => {
        if (!response.error) {
          this.dishes = response.data;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
        }
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los platos.' });
      }
    });
  }

  editDish(dish: Dish) {
    this.router.navigate(['/menu/edit', dish.dishid]);
  }

  deleteDish(dish: Dish) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este plato?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.dishesService.deleteDish(dish.dishid!.toString()).subscribe({
          next: (response) => {
            if (!response.error) {
              this.dishes = this.dishes.filter(d => d.dishid !== dish.dishid);
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
      }
    });
  }

  createDish() {
    this.router.navigate(['/menu/create']);
  }
}
