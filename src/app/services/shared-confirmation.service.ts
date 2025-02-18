import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class SharedConfirmationService {

    constructor(
        private confirmationService: ConfirmationService,
    ) { }

    confirmDelete(message: string, onAccept: () => void) {
        this.confirmationService.confirm({
            message: message,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => {
                onAccept();
            },
            acceptButtonStyleClass: 'p-button-danger'
        });
    }
}
