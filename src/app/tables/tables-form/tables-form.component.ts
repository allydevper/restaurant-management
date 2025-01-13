import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location, CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TablesService } from '../../services/tables.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tables-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SelectModule, ButtonModule, ToastModule, ConfirmDialogModule, CardModule, MessageModule, InputTextModule, InputNumberModule],
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
      tablenumber: [0, [Validators.required, Validators.min(0)]],
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
      const newTable = this.tableForm.value;
      if (this.isEditMode) {
        const tableId = this.route.snapshot.paramMap.get('id');
        console.log(newTable);
        this.tablesService.updateTable(tableId!, newTable).subscribe(
          (response) => {
            if (!response.error) {
              this.messageService.add({ severity: 'success', summary: 'Mesa Actualizada', detail: 'La mesa ha sido actualizada correctamente.' });
              this.goBack();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
            }
          },
          (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la mesa.' });
          }
        );
      } else {
        console.log(newTable);
        this.tablesService.createTable(newTable).subscribe(
          (response) => {
            if (!response.error) {
              console.log(response);
              this.messageService.add({ severity: 'success', summary: 'Mesa Creada', detail: 'La mesa ha sido creada correctamente.' });
              this.goBack();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
            }
          },
          (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la mesa.' });
          }
        );
      }
    } else {
      this.tableForm.markAllAsTouched();
    }
  }

  goBack() {
    this.location.back();
  }
}
