import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  createOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateOrder(id: string, order: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
