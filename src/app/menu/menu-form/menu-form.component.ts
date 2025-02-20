import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Dish } from '../../models/dish.model';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';
import { DishesService } from '../../services/dishes.service';
import { SharedMessageService } from '../../services/shared-message.service';

@Component({
  selector: 'app-menu-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectModule, CheckboxModule, ButtonModule, MessageModule, ToastModule, ConfirmDialogModule, CardModule, InputNumberModule, InputTextModule, ProgressSpinnerModule],
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
  loading: boolean = false;
  dishForm: FormGroup;
  categories = Object.values([
    { id: 1, name: 'Aperitivo' },
    { id: 2, name: 'Entrada' },
    { id: 3, name: 'Platos Principales' },
    { id: 4, name: 'Postres' },
    { id: 5, name: 'Bebidas' }
  ]);
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private dishesService: DishesService,
    private sharedMessageService: SharedMessageService) {

    this.dishForm = this.fb.group({
      name: ['', Validators.required],
      dishescategoryid: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      isavailable: [true]
    });
  }

  ngOnInit() {
    const dishId = this.route.snapshot.paramMap.get('id');
    if (dishId) {
      this.isEditMode = true;
      this.dishesService.getDishesById(dishId!).subscribe({
        next: (response) => {
          if (!response.error) {
            this.dishForm.patchValue({
              name: response?.data?.name,
              dishescategoryid: response?.data?.dishescategoryid,
              price: response?.data?.price,
              isavailable: response?.data?.isavailable
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
          }
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la información del plato.' });
        }
      });
    }
  }

  onSubmit() {
    if (this.dishForm.valid) {

      this.loading = true;
      this.changeDetectorRef.detectChanges();

      const newDish: Dish = this.dishForm.value;
      if (this.isEditMode) {
        const dishId = this.route.snapshot.paramMap.get('id');
        this.dishesService.updateDish(dishId!, newDish).subscribe({
          next: (response) => {
            if (!response.error) {
              this.sharedMessageService.add({ severity: 'success', summary: 'Plato Actualizado', detail: 'El plato ha sido actualizado correctamente.' });
              this.goBack();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
            }
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el plato.' });
          },
          complete: () => {
            this.loading = false;
          }
        });
      } else {
        this.dishesService.createDish(newDish).subscribe({
          next: (response) => {
            if (!response.error) {
              this.sharedMessageService.add({ severity: 'success', summary: 'Plato Creado', detail: 'El plato ha sido creado correctamente.' });
              this.goBack();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
            }
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el plato.' });
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
    } else {
      this.dishForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/menu']);
  }
}
