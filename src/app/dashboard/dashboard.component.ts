import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
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
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {
    this.loadTables();
    this.loadOrders();
    this.loadDishes();
  }

  loadTables() {
    this.dashboardService.getTables().subscribe({
      next: (response) => {
        if (!response.error) {
          this.totalTables = response.count;
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
    this.dashboardService.getOrders().subscribe({
      next: (response) => {
        if (!response.error) {
          this.totalOrders = response.totalOrders;
          this.totalIncome = response.totalIncome;
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
    this.dashboardService.getDishes().subscribe({
      next: (response) => {
        if (!response.error) {
          this.totalDishes = response.count;
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
