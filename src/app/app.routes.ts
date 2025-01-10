import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuListComponent } from './menu-management/menu-list/menu-list.component';
import { DishFormComponent } from './menu-management/dish-form/dish-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'menu', component: MenuListComponent },
  { path: 'menu/new', component: DishFormComponent },
  // otras rutas
];
