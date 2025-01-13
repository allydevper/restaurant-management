import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';
import { TablesListComponent } from './tables/tables-list/tables-list.component';
import { TablesFormComponent } from './tables/tables-form/tables-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'menu', component: MenuListComponent },
  { path: 'menu/create', component: MenuFormComponent },
  { path: 'menu/edit/:id', component: MenuFormComponent },
  { path: 'tables', component: TablesListComponent }, 
  { path: 'tables/create', component: TablesFormComponent }, 
  { path: 'tables/edit/:id', component: TablesFormComponent }, 
];
