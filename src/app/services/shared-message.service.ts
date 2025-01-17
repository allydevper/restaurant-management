import { Injectable } from '@angular/core';
import { ToastMessageOptions } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class SharedMessageService {
    private toastMessageOptions: ToastMessageOptions | null = null;

    add(toastMessageOptions: ToastMessageOptions) {
        this.toastMessageOptions = toastMessageOptions;
    }

    show(): ToastMessageOptions | null {
        const toastMessageOptions = this.toastMessageOptions;
        this.toastMessageOptions = null;
        return toastMessageOptions;
    }
}