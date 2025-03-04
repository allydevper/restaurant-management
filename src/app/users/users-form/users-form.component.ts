import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { SharedMessageService } from '../../services/shared-message.service';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectModule, ButtonModule, ToastModule, ConfirmDialogModule, CardModule, InputTextModule, PasswordModule, MessageModule]
})
export class UsersFormComponent implements OnInit {
  loading: boolean = false;
  userForm: FormGroup;
  isEditMode: boolean = false;
  roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Mesero', value: 'Mesero' }
  ];

  constructor(private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private sharedMessageService: SharedMessageService) {

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

      this.loading = true;
      this.changeDetectorRef.detectChanges();

      const newUser: User = this.userForm.value;
      if (this.isEditMode) {

        const userId = this.route.snapshot.paramMap.get('id');

        this.usersService.updateUser(userId!, newUser).subscribe({
          next: (response) => {
            if (!response.error) {
              this.sharedMessageService.add({ severity: 'success', summary: 'Usuario Actualizado', detail: 'El usuario ha sido actualizado correctamente.' });
              this.goBack();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
            }
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el usuario.' });
          },
          complete: () => {
            this.loading = false;
          }
        });

      } else {

        this.usersService.createUser(newUser).subscribe({
          next: (response) => {
            if (!response.error) {
              this.sharedMessageService.add({ severity: 'success', summary: 'Usuario Creado', detail: 'El usuario ha sido creado correctamente.' });
              this.goBack();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
            }
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el usuario.' });
          },
          complete: () => {
            this.loading = false;
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
