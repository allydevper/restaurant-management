import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Table } from '../../models/table.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { TablesService } from '../../services/tables.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule, PaginatorModule, CardModule, TagModule],
  providers: [MessageService, ConfirmationService]
})
export class TablesListComponent implements OnInit {
  tables: Table[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private tablesService: TablesService
  ) { }

  ngOnInit() {
    this.tablesService.getTables().subscribe(
      (response) => {
        if (!response.error) {
          this.tables = response.data;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
        }
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las mesas.' });
      }
    );
  }

  editTable(table: Table) {
    this.router.navigate(['/tables/edit', table.tableid]);
  }

  deleteTable(table: Table) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta mesa?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.tablesService.deleteTable(table.tableid!.toString()).subscribe(
          (response) => {
            if (!response.error) {
              this.tables = this.tables.filter(t => t.tableid !== table.tableid);
              this.messageService.add({ severity: 'success', summary: 'Mesa Eliminada', detail: 'La mesa ha sido eliminada correctamente.' });
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
            }
          },
          (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la mesa.' });
          }
        );
      }
    });
  }

  createTable() {
    this.router.navigate(['/tables/create']);
  }
}
