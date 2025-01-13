import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { User } from '../../models/user.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule, PaginatorModule, CardModule],
  providers: [MessageService, ConfirmationService]
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  cols: any[] = [];
  loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'userid', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'email', header: 'Correo' },
      { field: 'role', header: 'Rol' }
    ];

    this.usersService.getUsers().subscribe(
      (response) => {
        if (!response.error) {
          this.users = response.data;
          this.loading = false;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
        }
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los usuarios.' });
      }
    );
  }

  editUser(user: User) {
    this.router.navigate(['/users/edit', user.userid]);
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.usersService.deleteUser(user.userid!.toString()).subscribe(
          (response) => {
            if (!response.error) {
              this.users = this.users.filter(u => u.userid !== user.userid);
              this.messageService.add({ severity: 'success', summary: 'Usuario Eliminado', detail: 'El usuario ha sido eliminado correctamente.' });
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
            }
          },
          (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el usuario.' });
          }
        );
      }
    });
  }

  createUser() {
    this.router.navigate(['/users/create']);
  }
}
