import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { ErrorResponse } from '../models/errorresponse.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl = "";

  constructor(private http: HttpClient) {
    this.apiUrl = `${import.meta.env.NG_APP_PUBLIC_API_URL}/orders`;
  }

  createOrder(order: Order): Observable<{ error?: ErrorResponse }> {
    return this.http.post<{ error?: ErrorResponse }>(this.apiUrl, order);
  }

  getOrders(): Observable<{ data: Order[]; error?: ErrorResponse }> {
    return this.http.get<{ data: Order[]; error?: ErrorResponse }>(this.apiUrl);
  }

  getOrderById(id: string): Observable<{ data?: Order; error?: ErrorResponse }> {
    return this.http.get<{ data?: Order; error?: ErrorResponse }>(`${this.apiUrl}/${id}`);
  }

  updateOrder(id: string, order: Order): Observable<{ error?: ErrorResponse }> {
    return this.http.put<{ error?: ErrorResponse }>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: string): Observable<{ error?: ErrorResponse }> {
    return this.http.delete<{ error?: ErrorResponse }>(`${this.apiUrl}/${id}`);
  }

  createOrderWithDetails(order: Order): Observable<{ error?: ErrorResponse }> {
    return this.http.post<{ error?: ErrorResponse }>(`${this.apiUrl}/details`, order);
  }

  updateOrderWithDetails(id: string, order: Order): Observable<{ error?: ErrorResponse }> {
    return this.http.put<{ error?: ErrorResponse }>(`${this.apiUrl}/details/${id}`, order);
  }
}
