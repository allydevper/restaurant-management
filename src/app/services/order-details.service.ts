import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private apiUrl = `${environment.API_URL}/order-details`;

  constructor(private http: HttpClient) { }

  createOrderDetail(orderDetail: any): Observable<any> {
    return this.http.post(this.apiUrl, orderDetail);
  }

  getOrderDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOrderDetailById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateOrderDetail(id: string, orderDetail: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, orderDetail);
  }

  deleteOrderDetail(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
