import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish, DishCategory } from '../../models/dish.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectModule, CheckboxModule, MessageModule, ToastModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
  dishForm: FormGroup;
  categories = Object.values(DishCategory);

  constructor(private fb: FormBuilder, private messageService: MessageService, private location: Location) {
    this.dishForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      isAvailable: [false] // Initialize as false or true
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.dishForm.valid) {
      const newDish: Dish = this.dishForm.value;
      // TODO: Implement dish creation logic
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Dish created successfully!',
        life: 3000
      });
      this.dishForm.reset();
    }
  }

  goBack() {
    this.location.back();
  }
}
