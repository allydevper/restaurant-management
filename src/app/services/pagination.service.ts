import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    private paginationState: { [key: string]: { first: number, rows: number } } = {};

    constructor() { }

    savePaginationState(componentKey: string, first: number, rows: number): void {
        this.paginationState[componentKey] = { first, rows };
    }

    getPaginationState(componentKey: string): { first: number, rows: number } {
        return this.paginationState[componentKey] || { first: 0, rows: 10 };
    }
}