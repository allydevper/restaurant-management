import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Dish, DishCategory } from '../../models/dish.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { Location, CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectModule, CheckboxModule, ButtonModule, MessageModule, ToastModule, ConfirmDialogModule, CardModule, InputNumberModule, InputTextModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
  dishForm: FormGroup;
  categories = Object.values(DishCategory);
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private location: Location, private route: ActivatedRoute) {
    this.dishForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      isAvailable: [false]
    });
  }

  ngOnInit() {
    const dishId = this.route.snapshot.paramMap.get('id');
    if (dishId) {
      this.isEditMode = true;
    }
  }

  onSubmit() {
    if (this.dishForm.valid) {
      const newDish: Dish = this.dishForm.value;
      if (this.isEditMode) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Dish updated successfully!',
          life: 3000
        });
      } else {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Dish created successfully!',
          life: 3000
        });
      }
      this.dishForm.reset();
    }
  }

  goBack() {
    this.location.back();
  }
}
