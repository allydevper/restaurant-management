import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectModule, ButtonModule, ToastModule, ConfirmDialogModule, CardModule, InputTextModule, MessageModule],
  providers: [MessageService]
})
export class UsersFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode: boolean = false;
  roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Mesero', value: 'Mesero' }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private usersService: UsersService, private router: Router) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.usersService.getUserById(userId).subscribe({
        next: (response) => {
          if (!response.error) {
            this.userForm.patchValue({
              username: response?.data?.username,
              password: response?.data?.password,
              role: response?.data?.role
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
          }
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la información del usuario.' });
        }
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      if (this.isEditMode) {

        const userId = this.route.snapshot.paramMap.get('id');

        this.usersService.updateUser(userId!, newUser).subscribe({
          next: (response) => {
            if (!response.error) {
              this.messageService.add({ severity: 'success', summary: 'Usuario Actualizado', detail: 'El usuario ha sido actualizado correctamente.' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
            }
            this.goBack();
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el usuario.' });
          }
        });

      } else {

        this.usersService.createUser(newUser).subscribe({
          next: (response) => {
            if (!response.error) {
              this.messageService.add({ severity: 'success', summary: 'Usuario Creado', detail: 'El usuario ha sido creado correctamente.' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
            }
            this.goBack();
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el usuario.' });
          }
        });

      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
