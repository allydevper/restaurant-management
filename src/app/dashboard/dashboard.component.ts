import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { OrdersService } from '../services/orders.service';
import { TablesService } from '../services/tables.service';
import { DishesService } from '../services/dishes.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalTables: number = 0;
  totalOrders: number = 0;
  totalDishes: number = 0;
  totalIncome: number = 0;

  constructor(
    private ordersService: OrdersService,
    private tablesService: TablesService,
    private dishesService: DishesService
  ) { }

  ngOnInit() {
    this.loadTables();
    this.loadOrders();
    this.loadDishes();
  }

  loadTables() {
    this.tablesService.getTables().subscribe({
      next: (response) => {
        if (!response.error) {
          this.totalTables = response.data.length;
        } else {
          console.error(response.error.message);
        }
      },
      error: (error) => {
        console.error('Error loading tables:', error);
      }
    });
  }

  loadOrders() {
    this.ordersService.getOrders().subscribe({
      next: (response) => {
        if (!response.error) {
          this.totalOrders = response.data.length;
          this.totalIncome = response.data.reduce((acc, order) => acc + order.total!, 0);
        } else {
          console.error(response.error.message);
        }
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }

  loadDishes() {
    this.dishesService.getDishes().subscribe({
      next: (response) => {
        if (!response.error) {
          this.totalDishes = response.data.length;
        } else {
          console.error(response.error.message);
        }
      },
      error: (error) => {
        console.error('Error loading dishes:', error);
      }
    });
  }
}
