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
import { SharedMessageService } from '../../services/shared-message.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule, PaginatorModule, CardModule]
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private usersService: UsersService,
    private sharedMessageService: SharedMessageService
  ) { }

  ngOnInit() {
    const sharedMessage = this.sharedMessageService.show();
    if (sharedMessage) {
      setTimeout(() => {
        this.messageService.add(sharedMessage);
      }, 0);
    }

    this.loadUsersLazy({ first: this.first, rows: this.rows });
  }

  loadUsersLazy(event: any) {
    this.loading = true;
    this.first = event.first;
    this.rows = event.rows;

    this.usersService.getUsersByPage((this.first / this.rows) + 1, this.rows).subscribe({
      next: (response) => {
        if (!response.error) {
          this.users = response.data;
          this.totalRecords = response.count;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
        }
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los usuarios.' });
      },
      complete: () => {
        this.loading = false;
      }
    });
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
        this.loading = true;
        this.usersService.deleteUser(user.userid!.toString()).subscribe({
          next: (response) => {
            if (!response.error) {
              this.users = this.users.filter(u => u.userid !== user.userid);
              this.messageService.add({ severity: 'success', summary: 'Usuario Eliminado', detail: 'El usuario ha sido eliminado correctamente.' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
            }
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el usuario.' });
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
    });
  }

  createUser() {
    this.router.navigate(['/users/create']);
  }
}
