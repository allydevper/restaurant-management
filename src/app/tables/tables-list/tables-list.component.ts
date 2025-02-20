import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Table } from '../../models/table.model';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { TablesService } from '../../services/tables.service';
import { TagModule } from 'primeng/tag';
import { SharedMessageService } from '../../services/shared-message.service';
import { SharedConfirmationService } from '../../services/shared-confirmation.service';

@Component({
  selector: 'app-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule, PaginatorModule, CardModule, TagModule]
})
export class TablesListComponent implements OnInit {
  loading: boolean = false;
  tables: Table[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router,
    private tablesService: TablesService,
    private sharedConfirmationService: SharedConfirmationService,
    private sharedMessageService: SharedMessageService
  ) { }

  ngOnInit() {
    const sharedMessage = this.sharedMessageService.show();
    if (sharedMessage) {
      setTimeout(() => {
        this.messageService.add(sharedMessage);
      }, 0);
    }

    this.loadTables();
  }

  loadTables() {

    this.loading = true;
    this.changeDetectorRef.detectChanges();

    this.tablesService.getTables().subscribe({
      next: (response) => {
        if (!response.error) {
          this.tables = response.data;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
        }
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las mesas.' });
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  editTable(table: Table) {
    this.router.navigate(['/tables/edit', table.tableid]);
  }

  deleteTable(table: Table) {

    this.sharedConfirmationService.confirmDelete('¿Estás seguro de que deseas eliminar esta mesa?', () => {

      this.loading = true;
      this.changeDetectorRef.detectChanges();

      this.tablesService.deleteTable(table.tableid!.toString()).subscribe({
        next: (response) => {
          if (!response.error) {
            this.tables = this.tables.filter(t => t.tableid !== table.tableid);
            this.messageService.add({ severity: 'success', summary: 'Mesa Eliminada', detail: 'La mesa ha sido eliminada correctamente.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.message });
          }
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la mesa.' });
        },
        complete: () => {
          this.loading = false;
        }
      });
    });
  }

  createTable() {
    this.router.navigate(['/tables/create']);
  }
}
