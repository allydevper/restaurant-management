import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish, DishCategory } from '../../models/dish.model';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, CheckboxModule, Message],
  providers: [MessageService],
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
      price: ['', [Validators.required, Validators.min(0)]],
      isAvailable: [true],
      createdAt: [new Date()]
    });
  }

  ngOnInit() {}

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
