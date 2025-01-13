import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ToastModule, ConfirmDialogModule, CardModule],
  providers: [MessageService]
})
export class UsersFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private location: Location, private route: ActivatedRoute, private usersService: UsersService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      passwordhash: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.usersService.getUserById(userId).subscribe((response) => {
        if (!response.error) {
          this.userForm.patchValue({
            username: response.data.username,
            passwordhash: response.data.passwordhash,
            role: response.data.role
          });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
        }
      }, (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la información del usuario.' });
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      if (this.isEditMode) {
        const userId = this.route.snapshot.paramMap.get('id');
        this.usersService.updateUser(userId!, newUser).subscribe((response) => {
          if (!response.error) {
            this.messageService.add({ severity: 'success', summary: 'Usuario Actualizado', detail: 'El usuario ha sido actualizado correctamente.' });
            this.goBack();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
          }
        }, (error) => {
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el usuario.' });
        });
      } else {
        this.usersService.createUser(newUser).subscribe(response => {
          if (!response.error) {
            this.messageService.add({ severity: 'success', summary: 'Usuario Creado', detail: 'El usuario ha sido creado correctamente.' });
            this.goBack();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
          }
        }, (error) => {
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el usuario.' });
        });
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  goBack() {
    this.location.back();
  }
}
