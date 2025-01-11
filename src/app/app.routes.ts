import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuListComponent } from './menu-management/menu-list/menu-list.component';
import { MenuFormComponent } from './menu-management/menu-form/menu-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'menu', component: MenuListComponent },
  { path: 'menu/create', component: MenuFormComponent },
  { path: 'menu/edit/:id', component: MenuFormComponent },
];
