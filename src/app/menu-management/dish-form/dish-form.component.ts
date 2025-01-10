import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Dish, DishCategory } from '../../models/dish.model';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-dish-form',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, CheckboxModule, Message],
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss']
})
export class DishFormComponent implements OnInit {
  dishForm: FormGroup;
  categories = Object.values(DishCategory);

  constructor(private fb: FormBuilder, private messageService: MessageService) {
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
}
