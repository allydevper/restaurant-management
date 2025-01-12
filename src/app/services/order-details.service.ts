import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private apiUrl = 'http://localhost:3000/order-details';

  constructor(private http: HttpClient) { }

  createOrderDetail(orderDetail: any): Observable<any> {
    return this.http.post(this.apiUrl, orderDetail);
  }

  getOrderDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateOrderDetail(id: string, orderDetail: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, orderDetail);
  }

  deleteOrderDetail(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
