import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location, CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TablesService } from '../../services/tables.service';
import { ActivatedRoute } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-tables-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SelectModule, ButtonModule, ToastModule, ConfirmDialogModule, CardModule, MessageModule, InputTextModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './tables-form.component.html',
  styleUrls: ['./tables-form.component.scss']
})
export class TablesFormComponent implements OnInit {
  tableForm: FormGroup;
  isEditMode: boolean = false;
  statusOptions = [
    { label: 'Libre', value: 'Libre' },
    { label: 'Ocupada', value: 'Ocupada' },
    { label: 'En Limpieza', value: 'En Limpieza' }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService, private location: Location, private route: ActivatedRoute, private tablesService: TablesService) {
    this.tableForm = this.fb.group({
      tablenumber: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    const tableId = this.route.snapshot.paramMap.get('id');
    if (tableId) {
      this.isEditMode = true;
      this.tablesService.getTableById(tableId).subscribe((response) => {
        if (!response.error) {
          this.tableForm.patchValue({
            tablenumber: response.data.tablenumber,
            status: response.data.status
          });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
        }
      });
    }
  }

  onSubmit() {
    if (this.tableForm.valid) {
      if (this.isEditMode) {
        this.tablesService.updateTable(this.route.snapshot.paramMap.get('id')!, this.tableForm.value).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Table updated successfully' });
          this.location.back();
        });
      } else {
        this.tablesService.createTable(this.tableForm.value).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Table created successfully' });
          this.location.back();
        });
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
