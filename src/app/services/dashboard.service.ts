import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../models/dish.model';
import { ErrorResponse } from '../models/errorresponse.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    apiUrl = "";

    constructor(private http: HttpClient) {
        this.apiUrl = `${import.meta.env.NG_APP_PUBLIC_API_URL}/dashboard`;
    }

    getDishes(): Observable<{ count: number; error?: ErrorResponse }> {
        return this.http.get<{ count: number; error?: ErrorResponse }>(`${this.apiUrl}/dishes`);
    }

    getTables(): Observable<{ count: number; error?: ErrorResponse }> {
        return this.http.get<{ count: number; error?: ErrorResponse }>(`${this.apiUrl}/tables`);
    }

    getOrders(): Observable<{ totalOrders: number; totalIncome: number; error?: ErrorResponse }> {
        return this.http.get<{ totalOrders: number; totalIncome: number; error?: ErrorResponse }>(`${this.apiUrl}/orders`);
    }

}
