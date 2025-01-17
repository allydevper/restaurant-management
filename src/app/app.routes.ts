import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';
import { TablesListComponent } from './tables/tables-list/tables-list.component';
import { TablesFormComponent } from './tables/tables-form/tables-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { LoginComponent } from './users/login/login.component';
import { MainLayoutComponent } from './layout/main-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'menu', component: MenuListComponent, canActivate: [AuthGuard] },
      { path: 'menu/create', component: MenuFormComponent, canActivate: [AuthGuard] },
      { path: 'menu/edit/:id', component: MenuFormComponent, canActivate: [AuthGuard] },
      { path: 'tables', component: TablesListComponent, canActivate: [AuthGuard] },
      { path: 'tables/create', component: TablesFormComponent, canActivate: [AuthGuard] },
      { path: 'tables/edit/:id', component: TablesFormComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
      { path: 'users/create', component: UsersFormComponent, canActivate: [AuthGuard] },
      { path: 'users/edit/:id', component: UsersFormComponent, canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
