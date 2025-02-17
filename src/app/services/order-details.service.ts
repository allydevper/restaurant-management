import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetail } from '../models/orderdetail.model';
import { ErrorResponse } from '../models/errorresponse.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  apiUrl = "";

  constructor(private http: HttpClient) {
    this.apiUrl = `${import.meta.env.NG_APP_PUBLIC_API_URL}/order-details`;
  }

  createOrderDetail(orderDetail: OrderDetail): Observable<{ error?: ErrorResponse }> {
    return this.http.post<{ error?: ErrorResponse }>(this.apiUrl, orderDetail);
  }

  getOrderDetails(): Observable<{ data: OrderDetail[]; error?: ErrorResponse }> {
    return this.http.get<{ data: OrderDetail[]; error?: ErrorResponse }>(this.apiUrl);
  }

  getOrderDetailById(id: string): Observable<{ data?: OrderDetail; error?: ErrorResponse }> {
    return this.http.get<{ data?: OrderDetail; error?: ErrorResponse }>(`${this.apiUrl}/${id}`);
  }

  updateOrderDetail(id: string, orderDetail: OrderDetail): Observable<{ error?: ErrorResponse }> {
    return this.http.put<{ error?: ErrorResponse }>(`${this.apiUrl}/${id}`, orderDetail);
  }

  deleteOrderDetail(id: string): Observable<{ error?: ErrorResponse }> {
    return this.http.delete<{ error?: ErrorResponse }>(`${this.apiUrl}/${id}`);
  }
}
