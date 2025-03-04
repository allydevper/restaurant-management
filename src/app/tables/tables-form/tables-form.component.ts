import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TablesService } from '../../services/tables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedMessageService } from '../../services/shared-message.service';

@Component({
  selector: 'app-tables-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SelectModule, ButtonModule, ToastModule, ConfirmDialogModule, CardModule, MessageModule, InputTextModule, InputNumberModule],
  templateUrl: './tables-form.component.html',
  styleUrls: ['./tables-form.component.scss']
})
export class TablesFormComponent implements OnInit {
  loading: boolean = false;
  tableForm: FormGroup;
  isEditMode: boolean = false;
  status = [
    { label: 'Libre', value: 'Libre' },
    { label: 'Ocupada', value: 'Ocupada' },
    { label: 'En Limpieza', value: 'En Limpieza' }
  ];

  constructor(private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private tablesService: TablesService,
    private sharedMessageService: SharedMessageService) {

    this.tableForm = this.fb.group({
      tablenumber: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    const tableId = this.route.snapshot.paramMap.get('id');
    if (tableId) {
      this.isEditMode = true;
      this.tablesService.getTableById(tableId).subscribe({
        next: (response) => {
          if (!response.error) {
            this.tableForm.patchValue({
              tablenumber: response?.data?.tablenumber,
              status: response?.data?.status
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
          }
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la información de la mesa.' });
        }
      });
    }
  }

  onSubmit() {
    if (this.tableForm.valid) {

      this.loading = true;
      this.changeDetectorRef.detectChanges();

      const newTable = this.tableForm.value;
      if (this.isEditMode) {
        const tableId = this.route.snapshot.paramMap.get('id');
        newTable.updatedat = new Date();
        console.log(newTable);
        this.tablesService.updateTable(tableId!, newTable).subscribe({
          next: (response) => {
            if (!response.error) {
              this.sharedMessageService.add({ severity: 'success', summary: 'Mesa Actualizada', detail: 'La mesa ha sido actualizada correctamente.' });
              this.goBack();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
            }
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la mesa.' });
          },
          complete: () => {
            this.loading = false;
          }
        });
      } else {
        console.log(newTable);
        this.tablesService.createTable(newTable).subscribe({
          next: (response) => {
            if (!response.error) {
              this.sharedMessageService.add({ severity: 'success', summary: 'Mesa Creada', detail: 'La mesa ha sido creada correctamente.' });
              this.goBack();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
            }
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la mesa.' });
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
    } else {
      this.tableForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/tables']);
  }
}
