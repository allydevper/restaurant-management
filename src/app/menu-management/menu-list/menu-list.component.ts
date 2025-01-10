import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dish, DishCategory } from '../../models/dish.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
  template: `
    <div class="card">
      <div class="flex justify-content-between mb-3">
        <h2>Menu Management</h2>
        <button pButton label="Add New Dish" icon="pi pi-plus" (click)="openNew()"></button>
      </div>

      <p-table [value]="dishes" [paginator]="true" [rows]="10" 
               [globalFilterFields]="['name','category']" [tableStyle]="{'min-width': '75rem'}"
               [rowHover]="true" dataKey="id"
               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
               [showCurrentPageReport]="true">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Available</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-dish>
          <tr>
            <td>{{dish.name}}</td>
            <td>{{dish.category}}</td>
            <td>{{dish.price | currency}}</td>
            <td>
              <span [class]="'badge badge-' + (dish.isAvailable ? 'success' : 'danger')">
                {{dish.isAvailable ? 'Available' : 'Not Available'}}
              </span>
            </td>
            <td>{{dish.createdAt | date}}</td>
            <td>
              <button pButton icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                      (click)="editDish(dish)"></button>
              <button pButton icon="pi pi-trash" class="p-button-rounded p-button-danger"
                      (click)="deleteDish(dish)"></button>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>

    <p-toast></p-toast>
    <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
  `,
  styles: [`
    :host ::ng-deep {
      .p-datatable-header {
        background: #f8f9fa;
      }
      .badge {
        padding: 0.5rem;
        border-radius: 4px;
        &.badge-success {
          background: #22C55E;
          color: white;
        }
        &.badge-danger {
          background: #EF4444;
          color: white;
        }
      }
    }
  `]
})
export class MenuListComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    // TODO: Load dishes from service
    this.dishes = [
      {
        dishId: 1,
        name: 'Caesar Salad',
        category: DishCategory.APPETIZER,
        price: 12.99,
        isAvailable: true,
        createdAt: new Date()
      }
    ];
  }

  openNew() {
    // TODO: Implement new dish dialog
  }

  editDish(dish: Dish) {
    // TODO: Implement edit dish
  }

  deleteDish(dish: Dish) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + dish.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // TODO: Implement delete logic
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Dish Deleted',
          life: 3000
        });
      }
    });
  }
}
